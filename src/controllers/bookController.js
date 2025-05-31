const Book = require("../models/bookModel");

// 1. GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ inStock: true });
    if (!books) {
      return res.status(404).json({ success: false, message: 'No book found' });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Successfully fetched all books',
      books
    });
  } catch (err) {
    console.log('Error fetching all books:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// 2. POST a new book (admin adds a book)
exports.addBook = async (req, res) => {
  try {
    const { title, author, price, description, category, inStock } = req.body;
    // validation
    if (!title || !author || !price ) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    // check if book exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(404).json({ success: false, message: "Book already exists!" });
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
    res.status(201).json({ success: true, message: "Book added successfully", book: savedBook});
  } catch (err) {
    console.error("Error adding book: ", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// 3. PUT update a book (admin edits)
exports.editBook = async (req, res) => {
  try {
    const { bookId} = req.params;
    const { title, author, description, price, category, inStock } = req.body;
    if (!title || !author || !price) {
      return res.status(400).json({ success: false, message: 'title or author or price is missing' });
    } 
    const editedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, description, price, category, inStock },
      { new: true } // Return the updated version
    );
    if (!editedBook) {
      return res.status(404).json({ success: false, message: 'No edited book found' });
    }
    res.status(200).json({ success: true, message: "Book updated successfully", book: editedBook });
  } catch (err) {
    console.log('Error editing book:', err);
    res.status(400).json({ success: false, message: 'Internal Server Error' });
  }
}

// 4. DELETE a book (admin deletes)
exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: 'book failed to delete' });
    }
    res.status(200).json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    console.log('Error deleting book:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// 5. GET a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    // check if book exists
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, message: "Book found", book });
  } catch (err) {
    console.log('Error fetching book:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// 6. GET books by category
exports.getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category, inStock: true });
    // check if books exist
    if (!books || books.length === 0) {
      return res.status(404).json({ success: false, message: "No books found in this category" });
    }
    res.status(200).json({ success: true, message: "Books found", books });
  } catch (err) {
    console.log('Error fetching books by category:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// 7. GET books by author
exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author, inStock: true });
    // check if books exist
    if (!books || books.length === 0) {
      return res.status(404).json({ success: false, message: "No books found by this author" });
    }
    res.status(200).json({ success: true, message: "Books found", books });
  } catch (err) {
    console.log('Error fetching books by author:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// 8. GET books by title
exports.getBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title, inStock: true });
    // check if books exist
    if (!book || book.length === 0) {
      return res.status(404).json({ success: false, message: "No books found with this title" });
    }
    res.status(200).json({ success: true, message: "This book is found", book });
  } catch (err) {
    console.log('Error fetching book by title', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// 9. GET books by price range
exports.getBooksByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice }, inStock: true
    });
    // check if books exist
    if (!books || books.length === 0) {
      return res.status(404).json({ success: false, message: "No books found in this price range" });
    }
    res.status(200).json({ success: true, message: "Books found", books });
  } catch (err) {
    console.log('Error fetching books by price:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// 10. Post a buy now order
exports.buyNowOrder = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.user;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    if (!book.inStock || book.stockQuantity === 0) {
      return res.status(400).json({ success: false, message: 'Book is out of stock' });
    }
    // Create a new order
    const newOrder = new Order({
      userId,
      bookId,
      title: book.title,
      status: 'Pending',
    });
    // Save the order to the database
    const savedOrder = await newOrder.save();
    // Update the book stock
    book.stockQuantity -= 1;
    if (book.stockQuantity === 0) {
      book.inStock = false;
    }
    await book.save();
    res.status(201).json({ 
      success: true, 
      message: 'Buy now order placed successfully', 
      order: savedOrder 
    });
  } catch (err) {
    console.log('Error processing buy now order:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// 11. Post a review for a book
exports.postReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.user;
    const { rating, comment } = req.body;
    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Rating and comment are required' });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    // Check if the user has already reviewed this book
    const existingReview = book.reviews.find(review => review.userId.toString() === userId);
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this book' });
    }
    // Create a new review
    const newReview = {
      userId,
      rating,
      comment
    }
    // Add the review to the book's reviews array
    book.reviews.push(newReview);
    // Save the book with the new review
    const updatedBook = await book.save();
    res.status(201).json({ 
      success: true, 
      message: 'Review posted successfully', 
      book: updatedBook 
    });
  } catch (err) {
    console.log('Error posting review:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}