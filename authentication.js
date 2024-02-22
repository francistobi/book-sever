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

// async function getAllUsers() {
//   fs.readFile(booksDbPath, "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.writeHead(404);
//       res.end("error reading file");
//     }
//     const allUser = JSON.parse(data);
//     return allUser
//   });
// }

// async function authenticate(req, res) {
//   try {
//     const body = [];
//     req.on("data", (chunks) => {
//       body.push(chunks);
//       req.on("end", async () => {
//         const parsedData = Buffer.concat(body).toString();
//         if (!parsedData) {
//           res.end("No username or password passed")
//           return;
//         }
//         const logInDetail = JSON.parse(parsedData);
//         console.log(logInDetail);
//         const allUser = await getAllUsers()
//         const userFound  = allUser.find((user) => {
//           return user.username === logInDetail.username
//         })

//       });
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = { authenticate };
