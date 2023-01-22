import {randomUUID} from "crypto";

class Book {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly authors: string;
    readonly favorite: string;
    readonly fileCover: string;
    readonly fileName: string;
    constructor(title: string, description: string, authors: string, favorite: string, fileCover: string, fileName: string) {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.id = randomUUID();
    }

}

export default Book;