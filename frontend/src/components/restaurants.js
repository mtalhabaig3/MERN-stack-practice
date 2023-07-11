import React, { useState, useEffect } from "react";
import RestaurantsDataService from "../services/restaurant";
import { Link, useParams } from "react-router-dom";

const Restaurants = (props) => {
  const { id: restaurant_id } = useParams();
  console.log("restaurant_id : ", restaurant_id);

  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };

  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = (id) => {
    RestaurantsDataService.get(id)
      .then((response) => {
        setRestaurant(response.data);
        console.log("response: ", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(restaurant_id);
  }, [restaurant_id]);

  const deleteReview = (review_id, index) => {
    RestaurantsDataService.deleteReview(review_id, props.user.id)
      .then((response) => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
            <br />
            <strong>address: </strong>
            {restaurant.address.building}, {restaurant.address.street},{" "}
            {restaurant.address.zipcode}
          </p>
          <Link
            to={"/restaurants/" + restaurant_id + "/review"}
            className="btn btn-primary mx-1 mb-1 col-lg-2"
          >
            Add Review
          </Link>
          <h4>Reviews</h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br />
                          <strong> User: </strong>
                          {review.name}
                          <br />
                          <strong> Date: </strong>
                          {review.date}
                        </p>
                        {props.user && props.user.id === review.user_id && (
                          <div className="row">
                            <a
                              onClick={() => deleteReview(review._id, index)}
                              className="btn btn-primary mx-1 mb-1 col-lg-5"
                            >
                              Delete
                            </a>
                            <Link
                              to={"/restaurants/" + restaurant_id + "/review"}
                              state={{
                                currentReview: review,
                              }}
                              className="btn btn-primary mx-1 mb-1 col-lg-5"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>no reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
