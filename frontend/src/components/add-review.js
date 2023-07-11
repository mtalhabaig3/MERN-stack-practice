import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useLocation, useParams } from "react-router-dom";

const AddReview = (props) => {
  const { state } = useLocation();
  const { id: restaurant_id } = useParams();

  console.log(state);

  let initialReviewState = "";
  let editing = false;

  if (state && state.currentReview) {
    editing = true;
    initialReviewState = state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    let data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: restaurant_id,
    };

    if (editing) {
      data.review_id = state.currentReview._id;
      RestaurantDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You Submitted successfully!</h4>
              <Link
                to={"/restaurants/" + restaurant_id}
                className="btn btn-success"
              >
                Back To Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  required
                  value={review}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={saveReview} className="btn btn-success mt-1">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please Log In</div>
      )}
    </div>
  );
};

export default AddReview;
