import express, {Express, Request, Response} from "express";
import dotenv from 'dotenv';
import Book from "./Book";
import HttpStatusCode from "./HttpStatusCode";
import bodyParser from "body-parser";

dotenv.config();

const HOST: string = String(process.env.HOST);
const PORT: number = parseInt(String(process.env.PORT)) || 3000;

const app: Express = express();
let books: Book[] = [];

app.use(bodyParser.json())

app.get("/api/books", (req: Request, res: Response) => {
    res.status(HttpStatusCode.OK);

    res.json({result: books})
})

app.get("/api/books/:id", (req: Request, res: Response) => {
    const id: string = req.params.id;
    const findBook: Book | undefined = books.find((book: Book) => book.id === id);
    if(findBook) {
        res.status(HttpStatusCode.OK);
        res.json({result: findBook});
        return;
    }
    res.status(HttpStatusCode.BAD_REQUEST);
    res.json({cause: "Book not exists"});
})

app.post("/api/user/login", (req: Request, res: Response) => {
    res.status(HttpStatusCode.CREATED);
    res.json({id: 1, mail: "test@mail.ru" })
})

app.post("/api/books", (req: Request, res: Response) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook: Book = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);
    res.status(HttpStatusCode.OK);
    res.json(newBook);
})

app.put("/api/books/:id", (req: Request, res: Response) => {
    const id: string = req.params.id;
    const isFoundBook: boolean = books.some((book: Book) => book.id === id)
    if(isFoundBook) {
        res.status(HttpStatusCode.OK);
        res.json({result: "OK"});
        return;
    }
    res.status(HttpStatusCode.BAD_REQUEST);
    res.json({cause: "Book not exists"});
})

app.delete("/api/books/:id", (req: Request, res: Response) => {
    const id: string = req.params.id;
    books = books.filter((book: Book) => book.id !== id)
    res.status(HttpStatusCode.CREATED);
    res.json({id: 1, mail: "test@mail.ru" })
})

app.listen(PORT, HOST, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
})