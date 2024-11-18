"use strict";
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB = "HorseHealthHelper";
const USERS_COLLECTION = "users";
//****This should actually be a patch request**** */
const deleteHorse = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { userName, nickName } = req.body;
  const { horseId } = req.params;

  try {
    await client.connect();
    const db = client.db(DB);
    const oid = ObjectId.createFromHexString(horseId);
    const user = await db.collection(USERS_COLLECTION).findOne({ userName });
    console.log(user);
    if (user) {
      const removeThisHorse = await db
        .collection(USERS_COLLECTION)
        .find({ horses: { $elemMatch: { nickName, _id: oid } } });
      console.log({ removeThisHorse });
      const removeHorseFromUser = await db
        .collection(USERS_COLLECTION)
        .updateOne(
          { userName },
          { $pull: { horses: { nickName, oid: removeThisHorse.insertedId } } }
        );
      return res.status(200).json({
        status: 200,
        data: removeHorseFromUser,
        message: `${nickName} has been deleted`,
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
module.exports = { deleteHorse };
