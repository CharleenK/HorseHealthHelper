"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB = "HorseHealthHelper";
const USERS_COLLECTION = "users";
const HORSES_COLLECTION = "horses";
//add new tables, obect info date etc
const addHorse = async (req, res) => {
  const { userName } = req.body;
  const { nickName, registeredName, dateOfBirth, sex, breed, color, height } =
    req.body;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB);
    const user = await db.collection(USERS_COLLECTION).findOne({ userName });
    console.log(user);
    if (
      !nickName ||
      !registeredName ||
      !dateOfBirth ||
      !sex ||
      !breed ||
      !color ||
      !height
    ) {
      return res.status(400).json({ status: "error", error: "missing data" });
    }
    if (user) {
      const newHorse = await db.collection(HORSES_COLLECTION).insertOne({
        nickName,
        registeredName,
        dateOfBirth,
        sex,
        breed,
        color,
        height,
        dentalCare: [],
        // { date: "", exam: false, float: false, comment: "" }
        hoofCare: [],
        // {
        //   date: "",
        //   trim: false,
        //   shod: false,
        //   reset: false,
        //   comment: "",
        // },
        parasiteControl: [],
        // { date: "", productUsed: "" }
        vaccinationHistory: [],
        //{ date: "", vaccine: "", batchNumber: "" }
        diagnosticTesting: [],
        //{ date: "", condition: "", results: "" }
      });
      const addHorseToUser = await db
        .collection(USERS_COLLECTION)
        .updateOne(
          { userName },
          { $push: { horses: { nickName, _id: newHorse.insertedId } } }
        );

      // remove horse from users horses array***
      //findmethod
      //delete entire user***
      return res.status(200).json({
        status: "success",
        data: newHorse,
        addHorseToUser,
      });
  } else {
      return res.status(404).json({ status: 404, error: "Account Error" });
      }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
};
module.exports = { addHorse };
