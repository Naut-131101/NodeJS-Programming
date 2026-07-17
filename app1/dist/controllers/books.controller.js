import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook, } from "../services/books.service.js";
export const booksRouter = Router();
booksRouter.get("/books", getAllBooks);
booksRouter.post("/books", createBook);
booksRouter.get("/books/:bookId", getBookById);
booksRouter.put("/books/:id", updateBook);
booksRouter.delete("/books/:id", deleteBook);
//# sourceMappingURL=books.controller.js.map