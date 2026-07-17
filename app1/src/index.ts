import express from "express";
import { booksRouter } from "./controllers/books.controller.js";

const app = express();
const PORT = 9999;
const HOSTNAME = "0.0.0.0";

app.use(express.json());
app.use("/api", booksRouter);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://127.0.0.1:${PORT}/api/books`);
});
