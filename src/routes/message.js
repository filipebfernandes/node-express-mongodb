import { Router } from "express";
import uuid from "uuid/v4";

const router = Router();

router.get("/", (req, res) =>
  res.send(Object.values(req.context.models.messages))
);

router.post("/", (req, res) => {
  const id = uuid();

  const message = {
    id,
    text: req.body.text,
    userId: req.context.me
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.delete("/:messageId", (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
