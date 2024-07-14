import Book from "../model/book.model.js";

// Function to get all books
export const getBook = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json(error);
    }
};

// Function to add a new book
export const addBook = async (req, res) => {
    try {
        const { name, price, category, image, title } = req.body;
        console.log(req.file + req.file.path);
        const pdf = req.file ? req.file.path : null;
        //console.log(name+price+category+image+title+pdf);

        if (!name || !price || !category || !image || !title || !pdf) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newBook = new Book({
            name,
            price,
            category,
            image,
            title,
            pdf
        });

        await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        console.log("Error storing book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
