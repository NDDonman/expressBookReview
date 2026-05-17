const express = require("express");
const session = require("express-session");

const books = require("./booksdb");
const publicRoutes = require("./router/general");
const authenticatedRoutes = require("./router/auth_users");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(
  session({
    secret: "fingerprint_customer",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  })
);

// Make books available to routers
app.locals.books = books;

// Public routes
app.use("/", publicRoutes);

// Authenticated customer routes
app.use("/customer", authenticatedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});