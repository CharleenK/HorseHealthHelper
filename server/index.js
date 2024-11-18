"use strict";
const express = require("express");
const morgan = require("morgan");
const { logIn } = require("./Handlers/logIn.js");
const { createUser } = require("./Handlers/createUser.js");
const { addHorse } = require("./Handlers/addHorse.js");
const { getUser } = require("./Handlers/getUser.js");
const { getHorse } = require("./Handlers/getHorse.js");
const { createHorseCare } = require("./Handlers/createHorseCare.js");
const { deleteHorse } = require("./Handlers/deleteHorse.js");
const { deleteUser } = require("./Handlers/deleteUser.js");

const PORT = 8784;
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(morgan("tiny"));
app.use(express.json());
app.get("/server", (req, res) => {
  res.status(200).json({ status: 200, message: "End point success" });
});
app.get("/horse/:horseId", getHorse);
app.get("/user/:userName", getUser);
// app.get("/horse/:horseId", getHorseCare)
app.post("/login", logIn);
app.post("/createUser", createUser);
app.post("/addHorse", addHorse);
app.patch("/horseCare/:horseId", createHorseCare);
//**change url**/
app.patch("/horse/:horseId", deleteHorse);
app.delete("/user/:userName", deleteUser);

// app.delete()
// 404 for handling undefined routes
app
  .use("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "You are lost, my friend!",
    });
  })
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
