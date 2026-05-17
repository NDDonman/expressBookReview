const express = require("express");
const router = express.Router();

const { authenticatedUser } = require("../usersdb");

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.username) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized access. Please login first." });
};


router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (authenticatedUser(username, password)) {
    req.session.username = username;

    return res.status(200).json({
      message: "User successfully logged in"
    });
  }

  return res.status(401).json({
    message: "Invalid username or password"
  });
});


router.put("/auth/review/:isbn", isAuthenticated, (req, res) => {
  const books = req.app.locals.books;
  const isbn = req.params.isbn;
  const { review } = req.body;
  const username = req.session.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!review) {
    return res.status(400).json({ message: "Review is required" });
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review successfully added or updated",
    reviews: books[isbn].reviews
  });
});


router.delete("/auth/review/:isbn", isAuthenticated, (req, res) => {
  const books = req.app.locals.books;
  const isbn = req.params.isbn;
  const username = req.session.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[isbn].reviews[username]) {
    return res.status(404).json({
      message: "No review found for this user"
    });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: "Review successfully deleted",
    reviews: books[isbn].reviews
  });
});

module.exports = router;