import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    pdf: String, // This will store the path or URL to the PDF file
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
