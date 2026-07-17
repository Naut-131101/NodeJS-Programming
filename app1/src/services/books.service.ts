import type { Request, Response } from "express";
import { db } from "../db/books.store.js";
import type { Book } from "../models/books.model.js";

export function getAllBooks(req: Request, res: Response) {
  res.json(db.books);
}

export function createBook(req: Request, res: Response) {
  const { title, author, description, year } = req.body;

  if (!title || !author || !description || !year) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const book: Book = {
    id: db.nextId++,
    title: title,
    author: author,
    description: description,
    year: Number(year),
  };

  db.books.push(book);
  res.status(201).json(book);
}

export function getBookById(req: Request, res: Response) {
  const id = Number(req.params.bookId);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid ID input value." });
  }

  const book = db.books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: `Book with ID ${id} not found.` });
  }

  res.json(book);
}

export function updateBook(req: Request, res: Response) {
  const bookId = Number(req.params.id);
  if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({ message: "Invalid ID input value." });
  }

  const book = db.books.find((b) => b.id === bookId);
  if (!book) {
    return res
      .status(404)
      .json({ message: `Book with ID ${bookId} not found.` });
  }

  const { title, author, description, year } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.description = description || book.description;
  book.year = Number(year) || book.year;

  res.json(book);
}

export function deleteBook(req: Request, res: Response) {
  const bookId = Number(req.params.id);
  if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({ message: "Invalid ID input value." });
  }

  const index = db.books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    return res
      .status(404)
      .json({ message: `Book with ID ${bookId} not found.` });
  }

  db.books.splice(index, 1);
  res.status(201).json({ message: `Deleted book with ID ${bookId}` });
}
