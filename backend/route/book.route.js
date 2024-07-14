import express from "express";
import { getBook,addBook } from "../controller/book.controller.js";
import upload from "../middlware/uploads.js"
import multer from "multer";
import Book from "../model/book.model.js";

const router= express.Router();
router.get("/",getBook);
router.post("/add",addBook);

router.post('/store', upload.single('pdf'), async (req, res) => {
    try {
        // Extract book details from the request body
        const { name, price, category, image, title } = req.body;

        // Validate and parse the price
        let parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            if (price.toLowerCase() === "free") {
                parsedPrice = 0;
            } else {
                throw new Error('Invalid price value');
            }
        }

        // Create a new book instance
        const newBook = new Book({
            name,
            price: parsedPrice,
            category,
            image,
            title,
            pdf: req.file.path // Store the relative path of the uploaded PDF file
        });

        // Save the new book to the database
        await newBook.save();

        // Send a success response
        res.status(201).json({ message: 'Book stored successfully', book: newBook });
    } catch (error) {
        console.error('Error storing book:', error);
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware for Multer errors
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer error occurred (e.g., file size limit exceeded)
        res.status(413).json({ error: 'File size limit exceeded' });
    } else {
        // Handle other types of errors
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;