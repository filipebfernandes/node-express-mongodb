import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const users = await req.context.models.User.find();

  res.send(users);
});

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  res.send(user);
});

export default router;
