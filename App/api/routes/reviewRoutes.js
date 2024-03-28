const express = require("express");
const pool = require("../../database/db");

const router = express.Router();

//create a new review
router.post("/review", async (req, res) => {
  const { name, email, rating, review } = req.body;

  try {
    const result =
      await pool.query`INSERT INTO Review (Name, Email, Rating, Review) VALUES (${name}, ${email}, ${rating}, ${review})`;
    res
      .status(201)
      .json({ message: "Review successfully saved", review: req.body });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
