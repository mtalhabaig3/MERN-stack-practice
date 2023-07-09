import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    navigate("/restaurants");
  };

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            className="form-control"
            value={user.name}
            required
            id="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            name="id"
            onChange={handleInputChange}
            className="form-control"
            value={user.value}
            required
            id="id"
          />
        </div>

        <button className="btn btn-success mt-1" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
