import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  RouterProvider,
  Routes,
  Outlet,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root user={user} logOut={logOut} />}>
        <Route index path="/restaurants" element={<RestaurantsList />} />
        <Route
          path="/restaurants/:id/review"
          element={<AddReview user={user} />}
        />
        <Route path="/restaurants/:id" element={<Restaurant user={user} />} />
        <Route path="/login" element={<Login login={login} />} />
      </Route>
    )
  );
  async function login(user = null) {
    setUser(user);
  }

  async function logOut() {
    setUser(null);
  }
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

const Root = ({ user, logOut }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/restaurants">
            Restaurant Reviews
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link class="nav-link" to={"/restaurants"}>
                  Restaurants
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <button
                    onClick={logOut}
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Logout {user.name}
                  </button>
                ) : (
                  <Link class="nav-link" to={"/login"}>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default App;
