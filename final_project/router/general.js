const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  res.send(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let target = req.params.author
  let filtered_books = Object.values(books).filter(book => book.author === target);
  res.send(filtered_books)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let target = req.params.title
  let filtered_books = Object.values(books).filter(book => book.title === target);
  res.send(filtered_books)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  res.send(books[req.params.isbn]);
});

module.exports.general = public_users;
