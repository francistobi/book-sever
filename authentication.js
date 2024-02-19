const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");

const booksDbPath = path.join(__dirname, "db", "books.json");

function authenticate(req, res) {
  const body = [];
  req.on("data", (chunks) => {
    body.push(chunks);
    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
       console.log(parsedData)
        if(!parsedData){
          rejects("No usermame or password provided")
        }
        
    });
  });
}

module.exports = { authenticate };
