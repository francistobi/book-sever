const fs = require("fs");
const path = require("path");

const booksDbPath = path.join(__dirname, "db", "books.json");

function authenticate(req, res) {}

module.exports = { authenticate };
