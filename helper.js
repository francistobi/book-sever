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

      const lastBook = oldBooks[oldBooks.length - 1];
      console.log(lastBook);
      console.log("i am here");

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
function updateBooks (req,res) {
  const body = [];
   
}

module.exports = {
  addBooks,
  getAllBooks,
};
