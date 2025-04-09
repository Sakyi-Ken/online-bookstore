const Book = require("../models/bookModel");

// 1. GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Get all books from MongoDB
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. POST a new book (admin adds a book)
exports.addBook = async (req, res) => {
  try {
    const { title, author, price, description, image, category, inStock } = req.body;
    // validation
    if (!title || !author || !price ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // check if book exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(404).json({ message: "Book already exists!" });
    }
    // create new book
    const newBook = new Book({
      title,
      author,
      price,
      description,
      image,
      category,
      inStock
    });
    // save book to database
    const savedBook = await newBook.save(); // Save to MongoDB
    res.status(201).json({ message: "Book added successfully", savedBook});
  } catch (err) {
    console.error("Error adding book: ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// 3. PUT update a book (admin edits)
exports.editBook = async (req, res) => {
  try {
    const editedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body, // Updated data
      { new: true } // Return the updated version
    );
    res.json({ message: "Book updated successfully", editedBook });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// 4. DELETE a book (admin deletes)
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 5. GET a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const Book = await Book.findById(req.params.id);
    // check if book exists
    if (!Book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book found", Book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 6. GET books by category
exports.getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    // check if books exist
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found in this category" });
    }
    res.json({ message: "Books found", books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 7. GET books by author
exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    // check if books exist
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found by this author" });
    }
    res.json({ message: "Books found", books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 8. GET books by title
exports.getBooksByTitle = async (req, res) => {
  try {
    const books = await Book.find({ title: req.params.title });
    // check if books exist
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found with this title" });
    }
    res.json({ message: "Books found", books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 9. GET books by price range
exports.getBooksByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice }
    });
    // check if books exist
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found in this price range" });
    }
    res.json({ message: "Books found", books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 10. GET books by stock availability
exports.getBooksByStockAvailability = async (req, res) => {
  try {
    const books = await Book.find({ inStock: true });
    // check if books exist
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books available in stock" });
    }
    res.json({ message: "Books found", books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
