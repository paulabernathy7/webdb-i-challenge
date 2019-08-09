const express = require("express");

// database access for knex
const db = require("./data/dbConfig");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("<h3>Works!</h3>");
// });

//read
router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");

    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: "error getting data", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [accounts] = await db("accounts").where({ id }); // destructing an array. Only use if there is an array full of objects
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(404).json({ message: "id could not be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting data" });
  }
});

router.post("/", async (req, res) => {
  const accountData = req.body;

  try {
    const account = await db("accounts").insert(accountData);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: "could not add account" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const account = await db("accounts")
      .where({ id })
      .update(changes);

    if (account) {
      res.status(200).json({ updated: account });
    } else {
      res.status(404).json({ message: "could not find account" });
    }
  } catch (err) {
    res.status(500).json({ message: "could not update account" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const account = await db("accounts")
      .where({ id })
      .del();
    if (account) {
      res.status(200).json({ message: "deleted account " });
    } else {
      res.status(404).json({ message: "cound not find" });
    }
  } catch (err) {
    res.status(500).json({ message: "could not delete the account" });
  }
});

module.exports = router;
