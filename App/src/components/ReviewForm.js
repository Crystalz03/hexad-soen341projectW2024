import React, { useState } from 'react';
import "../style/SignUpForm.css";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: ''
  });

  const [error, setError] = useState("");
  const sendReview = async () => {
    try {
      const response = await fetch("http://localhost:9000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(
          "Server error: review not sent. Please try again later."
        );
      }
      alert("Thank you for the review!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    sendReview();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='review-form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required={true} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required={true} onChange={handleChange} />
        </div>
        <div>
          <label>Rating:</label>
          <div className="rating">
            <span onClick={() => handleRatingChange(5)} className={formData.rating >= 5 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(4)} className={formData.rating >= 4 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(3)} className={formData.rating >= 3 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(2)} className={formData.rating >= 2 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(1)} className={formData.rating >= 1 ? 'selected' : ''} >☆</span>
          </div>
        </div>
        <div>
          <label>Review:</label>
          <textarea name="review" rows="10" cols="70" onChange={handleChange} />
        </div>
        <button className="button-1" type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
