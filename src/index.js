import "dotenv/config";
import express from "express";
import cors from "cors";

import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("Filipe")
  };
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

app.get("/", (req, res) => res.send("Hello World!"));

connectDb().then(async () => {
  createUsersWithMessages();

  app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: "Filipe",
    email: "filipe@auroradigital.co"
  });

  const user2 = new models.User({
    username: "Joaquim Alberto",
    email: "joaquimalberto@kanimambo.co"
  });

  const message1 = new models.Message({
    text: "Braga é o maior",
    user: user1.id
  });

  const message2 = new models.Message({
    text: "Bem lindo, Bem lindo",
    user: user2.id
  });

  const message3 = new models.Message({
    text: "Mais lindo que uma flor",
    user: user2.id
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};
