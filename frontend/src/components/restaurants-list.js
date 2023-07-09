import React, { useEffect, useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchCuisine, setSearchCuisine] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((response) => {
        console.log("restaurants: ", response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        setCuisines(cuisines.concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const onChangeSearchZip = (e) => {
    setSearchZip(e.target.value);
  };

  const onChangeSearchCuisine = (e) => {
    setSearchCuisine(e.target.value);
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div class="input-group col-lg">
          <input
            type="text"
            class="form-control"
            placeholder="search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByName}
          >
            Search
          </button>
        </div>

        <div className="input-group col-lg">
          <input
            type="text"
            class="form-control"
            placeholder="search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />

          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByZip}
          >
            Search
          </button>
        </div>

        <div className="input-group col-lg">
          <select className="form-select" onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine) => {
              return (
                <option value={cuisine}>{cuisine.substring(0, 20)}</option>
              );
            })}
          </select>

          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByCuisine}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building}, ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className="btn col-lg-5 btn-primary mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
