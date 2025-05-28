const express = require("express");
const router = express.Router();
const { getAllBooks, addBook, editBook, deleteBook, getBookById } = require("../controllers/bookController");

module.exports = router;

// @route           GET /api/book/getAllBooks
// @description     get all books
// @access          Public

router.get("/books", getAllBooks);

// @route           POST /api/book/addBook
// @description     add a new book (admin)
// @access          Private (admin only)

router.post("/books/create", addBook);

// @route          PUT /api/book/editBook/:id
// @description    edit a book (admin)
// @access         Private (admin only)

router.put("/books/:bookId", editBook);

// @route          DELETE /api/book/deleteBook/:id
// @description    delete a book (admin)
// @access         Private (admin only)

router.delete("/books/:bookId", deleteBook);

// @route         GET /api/book/getBook/:id
// @description   get a single book
// @access        Public

router.get("/books/:bookId", getBookById);

// @route         GET /api/book/getBooksByCategory/:category
// @description   get books by category
// @access        Public

// router.get("/book/getBooksByCategory/:category", getBooksByCategory);

// // @route         GET /api/book/getBooksByAuthor/:author
// // @description   get books by author
// // @access        Public

// router.get("/book/getBooksByAuthor/:author", getBooksByAuthor);

// // @route        GET /api/book/getBooksByPriceRange/:min/:max
// // @description  get books by price range
// // access        Public

// router.get("/book/getBooksByPriceRange/:min/:max", getBooksByPriceRange);

// // @route        GET /api/book/getBooksByTitle/:title
// // @description  get books by title
// // @access       Public

// router.get("/book/getBooksByTitle/:title", getBooksByTitle);

// // @route        GET /api/book/getBooksByStockAvailability/:inStock
// // @description  get books by stock availability
// // @access       Public

// router.get("/getBooksByStockAvailability/:inStock", getBooksByStockAvailability);