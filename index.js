const express = require("express");

const server = express();

server.use(express.json());

const shortid = require("shortid");

let users = [
  {
    id: shortid.generate(),
    name: "Bruce Wayne",
    bio: "CEO",
  },
  {
    id: shortid.generate(),
    name: "Walter White",
    bio: "Chemistry Teacher",
  },
];

server.get("/", (req, res) => {
  res.json({ user: "Up and Running!" });
});

server.get("/api/users", (req, res) => {
  res.json(users);
});

server.post("/api/users", function (req, res) {
  let userInformation = req.body;
  users.push(userInformation);

  res.status(201).json(users);
});

server.listen(8000, () => console.log("API is up boit!"));
