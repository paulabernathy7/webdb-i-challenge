const express = require("express");

// database access for knex
const db = require("./data/dbConfig");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("<h3>Works!</h3>");
// });

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");

    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: "error getting data", error: err.message });
  }
});

module.exports = router;
