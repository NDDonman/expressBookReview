const express = require("express");
const router = express.Router();

const { users, isValid } = require("../usersdb");


router.get("/", (req, res) => {
  const books = req.app.locals.books;
  return res.status(200).json(books);
});


router.get("/isbn/:isbn", (req, res) => {
  const books = req.app.locals.books;
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }

  return res.status(404).json({ message: "Book not found" });
});


router.get("/author/:author", (req, res) => {
  const books = req.app.locals.books;
  const author = req.params.author.toLowerCase();

  const matchedBooks = Object.entries(books).filter(([isbn, book]) => {
    return book.author.toLowerCase() === author;
  });

  if (matchedBooks.length > 0) {
    return res.status(200).json(Object.fromEntries(matchedBooks));
  }

  return res.status(404).json({ message: "No books found by this author" });
});

router.get("/title/:title", (req, res) => {
  const books = req.app.locals.books;
  const title = req.params.title.toLowerCase();

  const matchedBooks = Object.entries(books).filter(([isbn, book]) => {
    return book.title.toLowerCase() === title;
  });

  if (matchedBooks.length > 0) {
    return res.status(200).json(Object.fromEntries(matchedBooks));
  }

  return res.status(404).json({ message: "No books found with this title" });
});


router.get("/review/:isbn", (req, res) => {
  const books = req.app.locals.books;
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }

  return res.status(404).json({ message: "Book not found" });
});


router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.status(200).json({
    message: "User successfully registered"
  });
});

module.exports = router;