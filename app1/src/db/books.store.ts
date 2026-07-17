import type { Book } from "../models/books.model.js";

export const db = {
  nextId: 1,
  books: [] as Book[],
};

db.books.push(
  {
    id: db.nextId++,
    title: "NodeJS - Part 1",
    author: "Ryan Dahl",
    description: "Learn NodeJS Basic Syntax",
    year: 2009,
  },
  {
    id: db.nextId++,
    title: "NodeJS - Part 2",
    author: "Ryan Dahl",
    description: "Learn NodeJS Advanced Syntax",
    year: 2010,
  }
);
