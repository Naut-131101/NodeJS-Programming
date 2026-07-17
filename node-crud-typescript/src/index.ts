import { createServer, IncomingMessage, ServerResponse } from "node:http";
import type { User } from "./models/User.js";
import { readFile } from "node:fs/promises";

const hostname = "0.0.0.0";
const port = 9999;

// DATA STRUCTURES
let nextId: number = 1;
let users: User[] = [
  { id: nextId++, name: "Betty", email: "b@gmail.com" },
  { id: nextId++, name: "Jonathan", email: "j@gmail.com" },
];

// HELPERS
// > JSON --> JS-Object
function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Trich xuat id dang so tu path dang /users/:id
function getIdFromParam(path?: string): number | null {
  if (!path) return null;

  const cleanPath = path.split("?")[0]; // bo query string neu co
  const parts = cleanPath!.split("/"); // ["", "users", "1"]
  if (parts.length !== 3) return null;
  if (parts[1] !== "users") return null;

  const id = Number(parts[2]);
  return Number.isFinite(id) ? id : null;
}

// Chuan hoa route: neu path co dang /users/<id> thi quy ve /users/:id
function normalizeRoute(method?: string, path?: string): string {
  const cleanPath = path ? path.split("?")[0] : path;
  const id = getIdFromParam(cleanPath);
  if (id !== null) {
    return `${method} /users/:id`;
  }
  return `${method} ${cleanPath}`;
}

// SERVER
const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, OPTIONS, PUT, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const path = req.url;
    const route = normalizeRoute(req.method, path);

    switch (route) {
      case "OPTIONS /users": {
        res.writeHead(204);
        res.end();
        return;
      }

      case "GET /": {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello World");
        return;
      }

      case "GET /favicon.ico": {
        try {
          const icon = await readFile("./public/favicon.ico");
          res.writeHead(200, { "Content-Type": "image/x-icon" });
          res.end(icon);
        } catch {
          res.writeHead(404);
          res.end();
        }
        return;
      }

      case "GET /users": {
        res.writeHead(200);
        res.end(JSON.stringify(users));
        return;
      }

      case "POST /users": {
        try {
          const data = await parseBody(req);
          if (!data.name || !data.email) {
            res.writeHead(400);
            res.end(
              JSON.stringify({ message: "Missing required fields." })
            );
            return;
          }
          const newUser: User = {
            id: nextId++,
            name: data.name,
            email: data.email,
          };
          users.push(newUser);
          res.writeHead(201);
          res.end(JSON.stringify(newUser));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ message: "Invalid Json" }));
        }
        return;
      }

      case "GET /users/:id": {
        const id = getIdFromParam(path);
        const user = users.find((u) => u.id === id);
        if (!user) {
          res.writeHead(404);
          res.end(JSON.stringify({ message: `User with ID ${id} not found.` }));
          return;
        }
        res.writeHead(200);
        res.end(JSON.stringify(user));
        return;
      }

      case "PUT /users/:id": {
        const id = getIdFromParam(path);
        try {
          const data = await parseBody(req);
          const user = users.find((u) => u.id === id);
          if (!user) {
            res.writeHead(404);
            res.end(JSON.stringify({ message: "User not found" }));
            return;
          }
          user.name = data.name || user.name;
          user.email = data.email || user.email;
          res.writeHead(200);
          res.end(JSON.stringify(user));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ message: "Invalid Json" }));
        }
        return;
      }

      case "DELETE /users/:id": {
        const delId = getIdFromParam(path);
        const index = users.findIndex((u) => u.id === delId);
        if (index === -1) {
          res.writeHead(404);
          res.end(JSON.stringify({ message: "User not found" }));
          return;
        }
        users.splice(index, 1);
        res.writeHead(200);
        res.end(JSON.stringify({ message: `Deleted User ID: ${delId}` }));
        return;
      }

      default: {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Method Not Allowed" }));
        return;
      }
    }
  }
);

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
