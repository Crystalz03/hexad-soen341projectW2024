const request = require("supertest");
const express = require("express");
const reviewRoutes = require("../api/routes/reviewRoutes");
const pool = require("../database/db");

const app = express();
app.use(express.json());
app.use(reviewRoutes);

describe("System Admin Routes", () => {
  beforeAll(async () => {
    try {
      await pool.connect();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  });

  afterAll(async () => {
    try {
      await pool.close();
      console.log("Database connection closed");
    } catch (error) {
      console.error("Error closing the database connection:", error);
    }
  });

  // Test addition of a new review
  it("should save the review", async () => {
    const response = await request(app)
    .post("/review")
    .send({
      name: "John",
      email: "johndoe@email.com",
      rating: 4,
      review: "Very nice cars!",
    
    });
    expect(response.status).toBe(201);
    expect(response.body.review).toEqual({
      name: "John",
      email: "johndoe@email.com",
      rating: 4,
      review: "Very nice cars!",
    });
  });
});
