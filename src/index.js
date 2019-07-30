import "dotenv/config";
import express from "express";
import cors from "cors";
import uuid from "uuid/v4";

const app = express();

let users = {
  1: {
    id: 1,
    username: "Filipe Fernandes"
  },
  2: {
    id: 2,
    username: "Joaquim Alberto"
  }
};

let messages = {
  1: {
    id: 1,
    text: "Hello World",
    userId: 1
  },
  2: {
    id: 2,
    text: "Bem lindo, Bem lindo",
    userId: 2
  }
};

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.me = users[1];
  next();
});

app.get("/users", (req, res) => res.send(Object.values(users)));

app.get("/users/:userId", (req, res) => res.send(users[req.params.userId]));

app.get("/messages", (req, res) => res.send(Object.values(messages)));

app.post("/messages", (req, res) => {
  const id = uuid();

  const message = {
    id,
    text: req.body.text,
    userId: req.me
  };

  messages[id] = message;

  return res.send(message);
});

app.delete("/messages/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } = messages;

  messages = otherMessages;

  return res.send(message);
});

app.get("/session", (req, res) => res.send(users[req.me.id]));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);

console.log(process.env.MY_SECRET);
