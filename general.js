const axios = require("axios");

const BASE_URL = "http://localhost:5000";


const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("All Books:");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching all books:", error.message);
  }
};


const getBookByISBN = (isbn) => {
  axios
    .get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      console.log(`Book with ISBN ${isbn}:`);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching book by ISBN:", error.message);
    });
};


const getBooksByAuthor = async (author) => {
  try {
    const encodedAuthor = encodeURIComponent(author);
    const response = await axios.get(`${BASE_URL}/author/${encodedAuthor}`);

    console.log(`Books by author ${author}:`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching books by author:", error.message);
  }
};


const getBooksByTitle = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await axios.get(`${BASE_URL}/title/${encodedTitle}`);

    console.log(`Books with title ${title}:`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching books by title:", error.message);
  }
};

// Run all functions for testing
const runTests = async () => {
  await getAllBooks();

  console.log("--------------------------------");

  getBookByISBN("1");

  console.log("--------------------------------");

  await getBooksByAuthor("Chinua Achebe");

  console.log("--------------------------------");

  await getBooksByTitle("Things Fall Apart");
};

runTests();

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};