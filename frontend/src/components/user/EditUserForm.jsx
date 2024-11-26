import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoleById, getUserById, users } from "../../sampleData";
import axios from "axios";

const backendServer = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

function EditUserForm() {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  const { id: userID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const [roleTitle, setRoleTitle] = useState("");
  const [sameAsEmail, setSameAsEmail] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await backendServer.get(`/api/users/${userID}`);

      if (response.status != 200) {
        throw new Error("Network response was not ok.");
      }

      const data = response.data;
      setFormData(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      let response = await backendServer.get("/api/roles/");
      if (response.status != 200) {
        throw new Error("Network response was not ok.");
      }

      const data = response.data;
      setRoles(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    // make PATCH request to server
    // at /users/:id
    // to update the user

    try {
      let response = await backendServer.patch(`/api/users/${userID}`, {
        user: formData,
      });

      console.log(response);

      if (response.status !== 200) {
        throw new Error("Network response was not ok.");
      }

      const updatedUser = response.data;
      setFormData(updatedUser);
      setLoading(false);
      navigate(`/users/${userID}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    let { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleEmailInput = (e) => {
    let { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (sameAsEmail) {
      // TOOD : Update username with email
      console.log("update username with: " + value);
    }
  };

  const handleSelectInput = (e) => {
    let { name, value } = e.target;

    let role = roles.some((role) => role._id === value);

    if (role) {
      setFormData({ ...formData, [name]: value });
      setRoleTitle(role.title);
    }
  };

  const handleCheckInput = (e) => {
    let { name, checked } = e.target;

    setFormData({ ...formData, [name]: checked });
  };

  const handleCheckSameAsEmail = (e) => {
    let { name, checked } = e.target;

    setSameAsEmail(checked);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error : {error}</p>
      ) : (
        <div className="container  row">
          <div className="col-2"></div>
          <div className="col-8 pt-5">
            <h1 className="text-center fs-2">Edit User</h1>
            <form className="mt-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="row mb-3">
                <label htmlFor="user-name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="user-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
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
                    value={formData.email}
                    onChange={handleEmailInput}
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
                    value={formData.username}
                    onChange={handleInput}
                    readOnly
                    disabled
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
                    value={formData.password}
                    onChange={handleInput}
                  />
                </div>
              </div>

              {/* role */}
              <div className="row mb-4">
                <label htmlFor="user-role" className="col-sm-2 col-form-label">
                  Role
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-select"
                    id="inputGroupSelect02"
                    name="roleId"
                    value={roleTitle}
                    onChange={handleSelectInput}
                  >
                    <option>{formData.roleId.title}</option>
                    {roles &&
                      roles.map((role) => {
                        return (
                          <option key={role._id} value={role._id}>
                            {role.title}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              {/* Make active checkbox */}
              <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="user-active-check"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleCheckInput}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="user-active-check"
                    >
                      Make this user Active
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row-reverse mt-5">
                <button
                  type="submit"
                  style={{
                    backgroundColor: "rgb(56, 126, 209)",
                    color: "#e9ecef",
                  }}
                  className="btn btn-primary    px-5 fs-4"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditUserForm;
