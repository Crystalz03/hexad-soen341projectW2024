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

//get reviews
router.get("/review", async (req,res) =>{
  try{
    const results = await pool.query`SELECT * FROM Review`;
    res.status(200).json({review: results.recordsets});
  }catch (error){
    console.error("Error finding review:",error);
    res.status(500).json({error:'Server Error'});
  }
});

// get average rating
router.get("/average-rating", async (req, res) => {
  try {
    const result = await pool.query`SELECT AVG(CAST(Rating AS FLOAT)) AS averageRating FROM Review`;
    const averageRating = result.recordset[0].averageRating;
    res.status(200).json({ averageRating });
  } catch (error) {
    console.error("Error calculating average rating:", error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// delete review
router.delete("/review/delete/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const result = await pool.query`DELETE FROM Review WHERE Email = ${email}`;
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error removing the review:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}
)


module.exports = router;
