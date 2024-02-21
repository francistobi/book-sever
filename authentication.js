const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");

const booksDbPath = path.join(__dirname, "db", "user.json");

async function getAllUsers() {
  fs.readFile(booksDbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end("error reading file");
    }
    const allUser = JSON.parse(data);
    return allUser
  });    
}

async function authenticate(req, res) {
  try {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
      req.on("end", async () => {
        const parsedData = Buffer.concat(body).toString();
        if (!parsedData) {
          res.end("No username or password passed")
          return
        }
        const logInDetail = JSON.parse(parsedData);
        console.log(logInDetail);
        const allUser = await getAllUsers()
        const userFound  = allUser.find((user) => {
          return user.username === logInDetail.username
        }) 
        console.log(userFound)
      });
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { authenticate };
