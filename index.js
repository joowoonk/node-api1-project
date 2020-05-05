const express = require("express");

const server = express();

server.use(express.json());

const shortid = require("shortid");

const users = [
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

// When the client makes a GET request to /api/users/:id:

// If the user with the specified id is not found:

// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If there's an error in retrieving the user from the database:

// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The user information could not be retrieved." }.

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let searchById = users.find((person) => person.id == id);
  if (searchById) {
    res.status(200).json(searchById);
  } else if (!searchById) {
    res.status(404).json({ Error: "The user by id doesn not exist" });
  } else {
    res.status(500).json({ Error: "The user info cannot be retrieved" });
  }
  //   console.log(searchById);
  //   res.status(200).json(searchById);
});

//foreach for patch within in it else if. if user has id that matched, then person.name = user.name and person.bio = user.bio

server.listen(8000, () => console.log("API is up boit!"));
