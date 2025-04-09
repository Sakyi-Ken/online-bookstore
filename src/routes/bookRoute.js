const express = require("express");
const router = express.Router();
const { getAllBooks, addBook, editBook, deleteBook, getBookById } = require("../controllers/bookController");

module.exports = router;

// @route           GET /api/book/getAllBooks
// @description     get all books
// @access          Public

router.get("/getAllBooks", getAllBooks);

// @route           POST /api/book/addBook
// @description     add a new book (admin)
// @access          Private (admin only)

router.post("/addBook", addBook);

// @route          PUT /api/book/editBook/:id
// @description    edit a book (admin)
// @access         Private (admin only)

router.put("/editBook/:id", editBook);

// @route          DELETE /api/book/deleteBook/:id
// @description    delete a book (admin)
// @access         Private (admin only)

router.delete("/deleteBook/:id", deleteBook);

// @route         GET /api/book/getBook/:id
// @description   get a single book
// @access        Public

router.get("/getBook/:id", getBookById);

// @route         GET /api/book/getBooksByCategory/:category
// @description   get books by category
// @access        Public

// router.get("/getBooksByCategory/:category", getBooksByCategory);

// // @route         GET /api/book/getBooksByAuthor/:author
// // @description   get books by author
// // @access        Public

// router.get("/getBooksByAuthor/:author", getBooksByAuthor);

// // @route        GET /api/book/getBooksByPriceRange/:min/:max
// // @description  get books by price range
// // access        Public

// router.get("/getBooksByPriceRange/:min/:max", getBooksByPriceRange);

// // @route        GET /api/book/getBooksByTitle/:title
// // @description  get books by title
// // @access       Public

// router.get("/getBooksByTitle/:title", getBooksByTitle);

// // @route        GET /api/book/getBooksByStockAvailability/:inStock
// // @description  get books by stock availability
// // @access       Public

// router.get("/getBooksByStockAvailability/:inStock", getBooksByStockAvailability);