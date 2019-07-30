import "dotenv/config";

import express from "express";

const app = express();

app.listen(3000, () => console.log("App listening on port 3000!"));

console.log(process.env.MY_SECRET);
