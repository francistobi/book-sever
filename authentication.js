const fs = require("fs");
const path = require("path");

const userDbPath = path.join(__dirname, "db", "user.json");

function getAllUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile(userDbPath, "utf8", (err, users) => {
      if (err) {
        reject(err);
      } 
      const parsedUser= JSON.parse(users) 
      console.log(parsedUser)
      resolve(parsedUser);
    });
  });
}

function authenticate(req, res) {
  return new Promise((resolve, reject) => {
    //Do authentication here
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", async () => {
      const parsedBody = Buffer.concat(body).toString();

      if (!parsedBody) {
        reject("No username or password provided");
      }

      const loginDetails = JSON.parse(parsedBody);

      const users = await getAllUsers();
      const userFound = users.find((user) => {
        return user.username === loginDetails.username;
      });

      if (!userFound.password || !userFound.username) {
        reject("User not found! Please sign up!")
      }
      
      if (userFound.password !== loginDetails.password) {
        reject("Invalid username or password!")
        res.writeHead(400)
      }
      resolve()
      res.writeHead(200)

    });
  })
}

module.exports = {
  authenticate,
};