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
      //unused variable data
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
      <form onSubmit={handleSubmit} className="base-form">
      {error && <p className="error">{error}</p>}[error handling added]
      <div>
        <label>Name</label>
          <input type="text" name="name" required={true} onChange={handleChange} />
        </div>
        <div>
        <label>Email address</label>
          <input type="email" name="email" required={true} onChange={handleChange} />
        </div>
        <div>
        <label>Rating</label>
          <div className="rating-container" style={{marginTop: '0'}}>
          <div className="rating" style={{marginTop: '0'}} >
            <span onClick={() => handleRatingChange(5)} className={formData.rating >= 5 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(4)} className={formData.rating >= 4 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(3)} className={formData.rating >= 3 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(2)} className={formData.rating >= 2 ? 'selected' : ''} >☆</span>
            <span onClick={() => handleRatingChange(1)} className={formData.rating >= 1 ? 'selected' : ''} >☆</span>
          </div>
          </div>
        </div>
        <label htmlFor="exampleFormControlInput1" className="form-label">Review</label>[fixed for and class tag]
          <textarea name="review" rows="8" cols="80" onChange={handleChange} />
          <br/> <br/>
        <button type="submit" style={{width: '50%'}}>Submit Review</button>
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
