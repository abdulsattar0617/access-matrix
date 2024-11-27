import React, { useState, useEffect } from "react";
import RolesTable from "./RolesTable";

function RoleList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_API}/api/roles`);
      
       
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setData(data);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="container row">
          <div className="col-1"></div>
          <div className="col-10 mt-5">
            <h1 className="fs-2">Roles(s) List</h1>
            <div className="mt-5">
              <RolesTable data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleList;
