import React, { useState, useEffect } from "react";
import { getRoleById } from "../../sampleData";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const backendServer = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

function RoleDetails() {
  // handle the input in states

  const { id: roleID } = useParams();

  const sampleRole = {
    _id: "674493a041ca594eb8949509",
    title: "Test role",
    permissions: {
      read: true,
      write: true,
    },
    otherPermissions: [],
  };

  // const roleID = sampleRole._id;

  const navigate = useNavigate();

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/api/roles/${roleID}`
      );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(data);
  };

  const handleEditOnClick = () => {
    navigate(`/roles/${roleID}/edit`);
  };

  const handleDeleteOnClick = async () => {
    // todo:  Delete the role with the ID : userID

    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      };

      let response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/api/roles/${roleID}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      navigate("/roles");
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
            <h1 className="text-center fs-2">Role Details</h1>
            <form className="mt-5" onSubmit={handleSubmit}>
              {/* Role */}
              <div className="row mb-3">
                <label htmlFor="role-title" className="col-sm-2 col-form-label">
                  Role
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="role-title"
                    name="title"
                    value={data.title}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              {/* Permissions */}
              <div className="row mb-3">
                <label htmlFor="role-permission" className=" col-form-label">
                  Permissoins
                </label>
                <div className="col-2"></div>
                <div className="col-sm-10 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="role-permission-read"
                      name="read"
                      checked={data.permissions.read}
                      readOnly
                    />
                    <label
                      className="form-check-label mx-5"
                      htmlFor="role-permission-read"
                    >
                      Read
                    </label>
                  </div>
                </div>
                <div className="col-2"></div>
                <div className="col-sm-10 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="role-permission-write"
                      name="write"
                      checked={data.permissions.write}
                      readOnly
                    />
                    <label
                      className="form-check-label mx-5"
                      htmlFor="role-permission-write"
                    >
                      Write
                    </label>
                  </div>
                </div>

                {/* Other permssion */}
                <div className="col-2"></div>
                <div className="col-sm-10 mb-3 row">
                  <label
                    htmlFor="role-permission-other"
                    className="col-sm-2 col-form-label"
                  >
                    Other
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="role-permission-other"
                      name="otherPermissions"
                      value={
                        data.otherPermissions.length > 0
                          ? data.otherPermissions
                          : "No other permissions"
                      }
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleDetails;
