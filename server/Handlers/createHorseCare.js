"use strict";
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB = "HorseHealthHelper";
const HORSES_COLLECTION = "horses";
//add new tables, obect info date etc
const createHorseCare = async (req, res) => {
  const { horseId } = req.params;
  const { section, data } = req.body;
  //deconstruct section and data, need logic that updates the horse doc, in the correct array($push)
  console.log(section);
  console.log(data);

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB);
    const oid = ObjectId.createFromHexString(horseId);
    const horse = await db.collection(HORSES_COLLECTION).findOne({ _id: oid });
    console.log(horse);
    if (!horse) {
      return res.status(400).json({
        status: "error",
        error: "Nonexistent horse",
      });
    }
    if (horse) {
      const addCareToHorse = await db.collection(HORSES_COLLECTION).updateOne(
        { _id: oid },
        {
          $push: {
            [section]: data,
          },
        }
      );
      if (addCareToHorse.acknowledged === true) {
        horse[section].push(data);
      }
      //make validation: section//
      return res.status(200).json({
        status: "success",
        data: horse[section],
      });
    } else {
      return res.status(404).json({ status: 404, error: "Care Error" });
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
};
module.exports = { createHorseCare };
