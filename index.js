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
  //   console.log(userInformation.bio, userInformation.name);
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

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let searchById = users.find((person) => person.id == id);
  if (searchById) {
    res.status(200).json(searchById);
  } else if (!searchById) {
    res
      .status(404)
      .json({ Error: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ Error: "The user information could not be retrieved." });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  let eachId = users.filter((person) => person.id === id);
  //   console.log(eachId);
  //   console.log(id);

  if (eachId.length === 0) {
    res
      .status(404)
      .json({ Error: "The user with the specified ID does not exist." });
  } else if (!users) {
    res
      .status(500)
      .json({ Error: "The user information could not be retrieved." });
  } else {
    users = users.filter((person) => person.id != id);
    res.status(200).json(users);
  }
});

server.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let userInformation = req.body;

  let checkid = users.filter((person) => person.id === id);
  if (checkid.length === 0) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (
    userInformation.bio === undefined ||
    userInformation.name === undefined ||
    userInformation.bio === "" ||
    userInformation.name === ""
  ) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  } else {
    users.forEach((person) => {
      if (person.id === id) {
        person.name = userInformation.name;
        person.bio = userInformation.bio;
      } else {
        return person;
      }
    });
    res.status(200).json(users);
  }
});
//foreach for patch within in it else if. if user has id that matched, then person.name = user.name and person.bio = user.bio

server.listen(8000, () => console.log("API is up boit!"));
