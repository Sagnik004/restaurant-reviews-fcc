import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import RestaurantsDataService from "../services/restaurant";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    fetchRestaurants();
    fetchCuisines();
  }, []);

  const fetchRestaurants = () => {
    RestaurantsDataService.getAll()
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch(e => console.log(e));
  }

  const fetchCuisines = () => {
    RestaurantsDataService.getCuisines()
      .then(res => {
        console.log(res.data);
        setCuisines(["All Cuisines"].concat(res.data));
      })
      .catch(e => console.log(e));
  }

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  }

  const handleSearchNameClick = () => {
    find(searchName, "name");
  }

  const handleSearchZipChange = (e) => {
    setSearchZip(e.target.value);
  }

  const handleSearchZipClick = () => {
    find(searchZip, "zipcode");
  }

  const handleCuisineChange = (e) => {
    setSearchCuisine(e.target.value);
  }

  const handleCuisineSearchClick = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  }

  const refreshList = () => {
    fetchRestaurants();
  }

  const find = (query, by) => {
    RestaurantsDataService.find(query, by)
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch(e => console.log(e));
  }

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={handleSearchNameChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSearchNameClick}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Zip"
            value={searchZip}
            onChange={handleSearchZipChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSearchZipClick}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <select onChange={handleCuisineChange}>
            {cuisines.map(cuisine => {
              return (
                <option value={cuisine}>{cuisine.substr(0, 20)}</option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleCuisineSearchClick}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {restaurants.map((restuarant) => {
          const address = `${restuarant.address.building} ${restuarant.address.street}, ${restuarant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restuarant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restuarant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                    <Link to={"/restaurants/"+restuarant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
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
}

export default RestaurantsList;