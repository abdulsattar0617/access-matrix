import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 

import CircleIcon from "@mui/icons-material/Circle";
import { red } from "@mui/material/colors";

function UserDetails() {
  const { id: userID } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/api/users/${userID}`
      );
      // const response = await fetch("http://localhost:3001/api/users");

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // console.log(response);

      const data = await response.json();
      setData(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEditOnClick = () => {
    navigate(`/users/${userID}/edit`);
  };

  const handleDeleteOnClick = async () => {
    // todo:  Delete the user with the ID : userID


    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      };

      let response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/api/users/${userID}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      navigate("/users");
    } catch (error) {
      setError(error.message);
    }

  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="container  row">
          <div className="col-2"></div>
          <div className="col-8 pt-5">
            <h1 className="text-center fs-2">User Details</h1>

            {/* Name */}
            <div className="row mb-3 mt-5">
              <label htmlFor="user-name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="user-name"
                  name="name"
                  value={data.name}
                  readOnly
                />
              </div>
            </div>

            {/* Email */}
            <div className="row mb-3">
              <label htmlFor="user-email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="user-email"
                  name="email"
                  value={data.email}
                  readOnly
                />
              </div>
            </div>

            {/* username */}
            <div className="row mb-3">
              <label
                htmlFor="user-username"
                className="col-sm-2 col-form-label"
              >
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="user-username"
                  name="username"
                  value={data.username}
                  readOnly
                />
              </div>
            </div>

            {/* Password */}
            <div className="row mb-3">
              <label
                htmlFor="user-password"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="user-password"
                  name="password"
                  value={data.password}
                  readOnly
                />
              </div>
            </div>

            {/* role */}
            <div className="row mb-4">
              <label htmlFor="user-role" className="col-sm-2 col-form-label">
                Role
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="user-role"
                  name="roleId"
                  value={data.roleId.title}
                  readOnly
                />
              </div>
            </div>

            {/* Status : active or inactive */}
            <div className="row mb-4">
              <label htmlFor="user-role" className="col-sm-2 col-form-label">
                Status
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="user-role"
                  name="roleId"
                  value={data.isActive ? "Active" : "Inactive"}
                  readOnly
                />
              </div>
              <div className="col-sm-2 d-flex  align-items-center">
                {data.isActive ? (
                  <CircleIcon color="success" />
                ) : (
                  <CircleIcon sx={{ color: red[500] }} />
                )}
              </div>
            </div>

            <div className="d-flex d-flex justify-content-end mt-5">
              <button
                onClick={handleDeleteOnClick}
                style={{ color: "#e9ecef" }}
                className="btn btn-danger  mx-2  px-5 fs-4"
              >
                Delete
              </button>
              <button
                onClick={handleEditOnClick}
                style={{
                  backgroundColor: "rgb(56, 126, 209)",
                  color: "#e9ecef",
                }}
                className="btn btn-primary  mx-2  px-5 fs-4"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
