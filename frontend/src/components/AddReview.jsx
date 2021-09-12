import React, { useState } from "react";
import { Link } from "react-router-dom";

import RestaurantsDataService from "../services/restaurant";

const AddReview = (props) => {
  let initialReviewState = "";
  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (ev) => {
    setReview(ev.target.value);
  }

  const handleSubmit = () => {
    const data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id,
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id;
      RestaurantsDataService.updateReview(data)
        .then(res => {
          setSubmitted(true);
          console.log(res.data);
        })
        .catch(e => console.log(e));
    } else {
      RestaurantsDataService.createReview(data)
        .then(res => {
          setSubmitted(true);
          console.log(res.data);
        })
        .catch(e => console.log(e));
    }
  }

  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link
                to={"/restaurants/" + props.match.params.id}
                className="btn btn-success"
              >
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">{editing ? "Edit" : "Create"} Review</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={handleSubmit} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          Please log in!
        </div>
      )}
    </div>
  );
}

export default AddReview;