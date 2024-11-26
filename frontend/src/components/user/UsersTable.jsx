import React from "react";
import { users } from "../../sampleData";
import CircleIcon from "@mui/icons-material/Circle";
import { red } from "@mui/material/colors";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Link } from "react-router-dom";

function createRow(id, name, status, action) {
  return (
    <tr>
      <td className="col-2" scope="col">
        {id}
      </td>
      <td className="col-6" scope="col">
        {name}
      </td>
      <td className="col-2" scope="col">
        {status}
      </td>
      <td className="col-2" scope="col">
        {action}
      </td>
    </tr>
  );
}

function UsersTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover ">
        <thead>
          <tr>
            <th className="col-2" scope="col">
              ####
            </th>
            <th className="col-6" scope="col">
              Name
            </th>
            <th className="col-2" scope="col">
              Status
            </th>
            <th className="col-2" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => {
              // id - first four digits
              const id = user._id.slice(-4);
              // name
              const name = user.name;
              // active / inactive status with icon
              let status = null;

              {
                user.isActive
                  ? (status = <CircleIcon color="success" />)
                  : (status = <CircleIcon sx={{ color: red[500] }} />);
              }

              // actions to delete & edit (icons)
              const editIcon = (
                <Link to={`/users/${user._id}/edit`}>
                  <EditNoteSharpIcon />
                </Link>
              );
              const deleteIcon = (
                <Link to={"/users"}>
                  <DeleteRoundedIcon />
                </Link>
              );

              return createRow(id, name, status, [editIcon, deleteIcon]);
            })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
