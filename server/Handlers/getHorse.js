"use strict";
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB = "HorseHealthHelper";
const HORSES_COLLECTION = "horses";
//check user's password from req body= user document***needs incryption***
const getHorse = async (req, res) => {
  const { horseId } = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB);
    const oid = ObjectId.createFromHexString(horseId);
    console.log(oid);
    const horse = await db.collection(HORSES_COLLECTION).findOne({ _id: oid });
    //change _id.horseId to string*****
    console.log(horse);
    if (horse) {
      res.status(200).json({
        status: 200,
        data: horse,
      });
    } else {
      return res
        .status(404)
        .json({
          status: 404,
          error: "Sorry, no horse with that Nick Name was found",
        });
      }
  } catch (err) {
    res.status(500).json({ status: 500, message: "server Failure" });
  } finally {
    client.close();
  }
};
module.exports = { getHorse };
