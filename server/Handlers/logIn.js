"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB = "HorseHealthHelper";
const USERS_COLLECTION = "users";
//check user's password from req body= user document***needs incryption***
const logIn = async (req, res) => {
  const { userName, password } = req.body;
  const client = new MongoClient(MONGO_URI);
  //need same for password
  try {
    await client.connect();
    const db = client.db(DB);
    const user = await db.collection(USERS_COLLECTION).findOne({ userName });
    console.log(user);
    if (user && password === user.password) {
      res.status(200).json({
        status: 200,
        data: { userName: user.userName, horses: user.horses },
      });
    } else {
      return res.status(404).json({ status: 404, error: "Sign In Error" });
      //make messages less robotic
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Sign In Failure" });
  } finally {
    client.close();
  }
};
module.exports = { logIn };
