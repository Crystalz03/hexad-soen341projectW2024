import React, { useState } from 'react';
import "../style/style.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS




const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: ''
  });

  const [error, setError] = useState("");
  const [average, setAverage] = useState();
  const [loading, setLoading] = useState(false);
  const [seeForm, setSeeForm] = useState(true);


  const sendReview = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          "Server error: review not sent. Please try again later."
        );
      }
    getAverageRating();
    
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
      setSeeForm(false);
    }
  };

  const getAverageRating = async() => {
    try {
      const response = await fetch("http://localhost:9000/average-rating", {
      method: 'GET', 
    })

    const data = await response.json();

    if (response.ok) {
      setAverage(data.averageRating);
    }

   } catch (error) {
    setError("Error getting the average rating");
    console.error(error);
   }

  };



  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div>
      {seeForm ?
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
          <input type="text" name="name" required={true} onChange={handleChange} />
        </div>
        <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" name="email" required={true} onChange={handleChange} />
        </div>
        <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Rating</label>
          <div className="rating-container">
          <div className="rating">
            <span onClick={() => handleRatingChange(5)} className={formData.rating >= 5 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(4)} className={formData.rating >= 4 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(3)} className={formData.rating >= 3 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(2)} className={formData.rating >= 2 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(1)} className={formData.rating >= 1 ? 'selected' : ''} >☆</span>
          </div>
          </div>
        </div>
        <div>
        <label for="exampleFormControlInput1" class="form-label">Review</label>
          <textarea name="review" rows="10" cols="70" onChange={handleChange} />
        </div>
        <button className="btn btn-primary" style={{backgroundColor: '#ea4c89', border: '#ea4c89', color: 'white'}} type="submit">Submit Review</button>
      </form>
    </div> : null}
      {!loading && average ?
        <div> Our current rating is {average.toFixed(2)} stars. 
        </div>
        : null}
      </div>
  );
};

export default ReviewForm;
