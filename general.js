const axios = require("axios");

const BASE_URL = "http://localhost:5000";


function getAllBooks() {
  return axios
    .get(`${BASE_URL}/`)
    .then((response) => {
      console.log("Successfully retrieved all books");
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Error retrieving all books");
      console.error(error.message);
    });
}



function getBookByISBN(isbn) {
  return axios
    .get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      console.log(`Successfully retrieved book with ISBN ${isbn}`);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(`Error retrieving book with ISBN ${isbn}`);
      console.error(error.message);
    });
}


async function getBooksByAuthor(author) {
  try {
    const encodedAuthor = encodeURIComponent(author);
    const response = await axios.get(`${BASE_URL}/author/${encodedAuthor}`);

    console.log(`Successfully retrieved books by author: ${author}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(`Error retrieving books by author: ${author}`);
    console.error(error.message);
  }
}


async function getBooksByTitle(title) {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await axios.get(`${BASE_URL}/title/${encodedTitle}`);

    console.log(`Successfully retrieved books with title: ${title}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(`Error retrieving books with title: ${title}`);
    console.error(error.message);
  }
}

// Test function
async function runTests() {
  await getAllBooks();

  console.log("--------------------------------");

  await getBookByISBN("1");

  console.log("--------------------------------");

  await getBooksByAuthor("Chinua Achebe");

  console.log("--------------------------------");

  await getBooksByTitle("Things Fall Apart");
}

runTests();

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
