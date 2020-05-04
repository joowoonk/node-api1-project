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
  userInformation.id = shortid.generate();
  console.log(userInformation.bio, userInformation.name);
  if (
    userInformation.bio === undefined ||
    userInformation.name === undefined ||
    userInformation.name === "" ||
    userInformation.bio === ""
  ) {
    res.status(400).json({ Error: "Please insert name and bio" });
  } else if (!userInformation) {
    res.status(402).json({ Error: "There was an error tying to get the data" });
  } else {
    users.push(userInformation);
    res.status(201).json(users);
  }
});

//foreach for patch within in it else if. if user has id that matched, then person.name = user.name and person.bio = user.bio

server.listen(8000, () => console.log("API is up boit!"));
