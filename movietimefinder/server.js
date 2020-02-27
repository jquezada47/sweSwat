// Import statements
const express = require("express");
const mysql = require("mysql");
const path = require("path");

// Global Variables
const port = 3000;

// SQL Database connection
const database = mysql.createConnection({
    host: "localhost",
    user: "server",
    password: "Server_Test123"
});

// const client = new MongoClient(url);
const root = path.join(__dirname, "build");

// Creates the server
const server = express(express.static(root));

server.listen(port, () => {
    console.log(`Server listening of port ${port}`);
    console.log(`Root folder at ${root}`);
});

server.get("/", (req, res) => {
    console.log("Someone Connected");
    res.send("Welcome To the backend");
});
