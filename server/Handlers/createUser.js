"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB = "HorseHealthHelper";
const USERS_COLLECTION = "users";

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB);
    const user = await db.collection(USERS_COLLECTION).findOne({ userName });
    console.log(user);
    if (user) {
      return res.status(400).json({
        status: "error",
        error:
          "Pre-existing account, please sign in or create one with new name",
      });
    }

    if (!userName || !email || !password) {
      return res.status(400).json({ status: "error", error: "missing data" });
    }
    if (!user) {
      const newUser = await db.collection(USERS_COLLECTION).insertOne({
        userName,
        email,
        password,
        horses: [],
      });

      return res.status(200).json({ status: "success", data: newUser });
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
};
module.exports = { createUser };
