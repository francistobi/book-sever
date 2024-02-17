const http = require("http");
const fs = require("fs");
const path = require("path");
const { buffer } = require("stream/consumers");
const { getAllBooks, addBooks, updateBooks, deleteBook } = require("./helper");

const bookPath = path.join(__dirname, "db", "books.json");

const port = 6000;
const HOST_NAME = "localhost";

function requestHandler(req, res) {
  if (req.url === "/books" && req.method === "GET") {
    getAllBooks(req, res);
  } else if (req.url === "/books" && req.method === "POST") {
    addBooks(req, res);
  } else if (req.url === "/books" && req.method === "PUT") {
    updateBooks(req, res);
  } else if (req.url === "/books" && req.method === "DELETE") {
    deleteBook(req, res);
  }
}
const server = http.createServer(requestHandler);

server.listen(port, () => {
  booksDb = JSON.parse(fs.readFileSync(bookPath, "utf8"));
  console.log(`server listening on ${HOST_NAME}:${port}`);
});
