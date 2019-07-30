import "dotenv/config";
import express from "express";
import cors from "cors";
import uuid from "uuid/v4";

import models from "./models";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  };
  next();
});

app.get("/users", (req, res) =>
  res.send(Object.values(req.context.models.users))
);

app.get("/users/:userId", (req, res) =>
  res.send(req.context.models.users[req.params.userId])
);

app.get("/messages", (req, res) =>
  res.send(Object.values(req.context.models.messages))
);

app.post("/messages", (req, res) => {
  const id = uuid();

  const message = {
    id,
    text: req.body.text,
    userId: req.context.me
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete("/messages/:messageId", (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

app.get("/session", (req, res) =>
  res.send(req.context.models.users[req.context.me.id])
);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);

console.log(process.env.MY_SECRET);
