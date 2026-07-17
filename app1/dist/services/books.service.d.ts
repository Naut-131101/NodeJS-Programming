import type { Request, Response } from "express";
export declare function getAllBooks(req: Request, res: Response): void;
export declare function createBook(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function getBookById(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function updateBook(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function deleteBook(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=books.service.d.ts.map