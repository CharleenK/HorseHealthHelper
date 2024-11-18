"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB = "HorseHealthHelper";
const USERS_COLLECTION = "users";

const deleteUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { userName } = req.params;
  try {
    await client.connect();
    const db = client.db(DB);
    const user = await db.collection(USERS_COLLECTION).findOne({ userName });
    console.log(user);
    if (user) {
      const removeUser = await db
        .collection(USERS_COLLECTION)
        .deleteOne({ userName });
      return res.status(200).json({
        status: 200,
        userRemoved: removeUser.deletedCount === 1,
        message: `${userName} has been deleted`,
      });
    } else {
      return res.status(404).json({ status: 404, error: "Account Error" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Deletion failure" });
  } finally {
    client.close();
  }
};

module.exports = { deleteUser };
