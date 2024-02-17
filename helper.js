const fs = require("fs");
const path = require("path");

const bookPath = path.join(__dirname, "db", "books.json");

function getAllBooks(req, res) {
  fs.readFile(bookPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end("An error occured");
    }
    res.end(data);
  });
}

function addBooks(req, res) {
  const body = [];
  req.on("data", (chunks) => {
    body.push(chunks);
  });
  req.on("end", () => {
    const parseData = Buffer.concat(body).toString();
    const newBook = JSON.parse(parseData);

    fs.readFile(bookPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404);
        res.end("An error occured");
      }
      // console.log(data)
      const oldBooks = JSON.parse(data);
      const allBooks = [...oldBooks, newBook];

      const lastBookId = allBooks.length - 1;
      console.log(allBooks);
      newBook.id = lastBookId + 1;

      fs.writeFile(bookPath, JSON.stringify(allBooks), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify([
              {
                message:
                  "Internal server error : could not save book to database",
              },
            ])
          );
        }
        res.end(JSON.stringify(newBook));
      });
    });
  });
}
function updateBooks(req, res) {
  const body = [];
  req.on("data", (chunks) => {
    body.push(chunks);
  });
  req.on("end", () => {
    const parseData = Buffer.concat(body).toString();
    const newData = JSON.parse(parseData);
    const bookId = newData.id;
    fs.readFile(bookPath, "utf8", (err, books) => {
      if (err) {
        console.log(err);
        res.writeHead(404);
        res.end(
          JSON.stringify({
            message: "internal server error: unable to read file",
          })
        );
      }
      const bookDb = JSON.parse(books);
      console.log(bookDb);
      const bookIndex = bookDb.findIndex((book) => {
        return book.id === bookId;
      });
      if (bookIndex === -1) {
        res.writeHead(404);
        res.end(
          JSON.stringify({
            message: "book with index not found",
          })
        );
      }
      console.log(bookIndex);
      const updatedBook = { ...bookDb[bookIndex], ...newData };
      bookDb[bookIndex] = updatedBook;

      fs.writeFile(bookPath, JSON.stringify(bookDb), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify([
              {
                message:
                  "Internal server error : could not save book to database",
              },
            ])
          );
        }
        res.end("update successful");
      });
    });
  });
}

function deleteBook(req, res) {
  const body = [];
  req.on("data", (chunks) => {
    body.push(chunks);
  });
  req.on("end", () => {
    const parseData = Buffer.concat(body).toString();
    const idToDel = JSON.parse(parseData);
    const deleteId = idToDel.id;
    fs.readFile(bookPath, "utf8", (err, books) => {
      if (err) {
        if (err) {
          console.log(err);
          res.writeHead(404);
          res.end(
            JSON.stringify({
              message: "An error occured",
            })
          );
        }
      }
      const bookObj = JSON.parse(books);

      const bookIndex = bookObj.findIndex((book) => {
        return book.id === deleteId;
      });
      if (bookIndex === -1) {
        res.writeHead(404);
        res.end(
          JSON.stringify({
            message: "book with index not found",
          })
        );
      }
      bookObj.splice(bookIndex, 1);
      fs.writeFile(bookPath, JSON.stringify(bookObj), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(404);
          res.end(
            JSON.stringify({
              message: "unable to write to database",
            })
          );
        }
        res.end("delete successful");
      });
      console.log(bookObj);
    });
  });
}


module.exports = {
  addBooks,
  getAllBooks,
  updateBooks,
  deleteBook
};
