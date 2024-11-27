import React, { useState, useEffect } from "react";
import { getRoleById } from "../../sampleData";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendServer = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

function NewRoleForm() {
  // handle the input in states
  const [formData, setFormData] = useState({
    title: "",
    permissions: {
      read: false,
      write: false,
    },
    otherPermissions: [],
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetchRoles();
  }, []);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    // save role in database

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      let response = await fetch(
        `${process.env.REACT_APP_SERVER_API}/api/roles`,
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

  const handleInput = (e) => {
    let { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

  };

  const handleCheckInput = (e) => {
    let { name, checked } = e.target;
    let permissions = formData.permissions;

    permissions[name] = checked;
    setFormData((prevData) => ({ ...prevData, ["permissions"]: permissions }));
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
            <h1 className="text-center fs-2">Create New Role</h1>
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
                    value={formData.title}
                    onChange={handleInput}
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
                      checked={formData.permissions.read}
                      onChange={handleCheckInput}
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
                      checked={formData.permissions.write}
                      onChange={handleCheckInput}
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
                      value={formData.otherPermissions}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="d-flex flex-row-reverse mt-5">
                <button
                  type="submit"
                  style={{
                    backgroundColor: "rgb(56, 126, 209)",
                    color: "#e9ecef",
                  }}
                  className="btn btn-primary    px-5 fs-4"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewRoleForm;
