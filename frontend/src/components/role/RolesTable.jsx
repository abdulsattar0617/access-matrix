import React from "react";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Link } from "react-router-dom";

function createRow(id, role, readPer, writePer, actions) {
  return (
    <tr>
      <td className="col-2" scope="col">
        {id.slice(-4)}
      </td>
      <td className="col-6" scope="col">
        {/* <a href={}></a> */}
        <Link to={`/roles/${id}`}>{role}</Link>
      </td>
      <td className="col-2" scope="col">
        {readPer}
      </td>
      <td className="col-2" scope="col">
        {writePer}
      </td>
      <td className="col-2" scope="col">
        {actions}
      </td>
    </tr>
  );
}

function RolesTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover ">
        <thead>
          <tr>
            <th className="col-2" scope="col">
              ####
            </th>
            <th className="col-6" scope="col">
              Role Title
            </th>
            <th className="col-2" scope="col">
              Read
            </th>
            <th className="col-2" scope="col">
              Write
            </th>
            <th className="col-2" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((role) => {
              // id - first four digits
              const id = role._id;
              // name
              const title = role.title;

              // read checkbox
              const readPermission = (
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={role.permissions.read}
                  readOnly
                />
              );

              // write checkbox
              const writePermission = (
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={role.permissions.write}
                  readOnly
                />
              );

              // actions to delete & edit (icons)
              const editIcon = (
                <Link to={`/roles/${role._id}/edit`}>
                  <EditNoteSharpIcon />
                </Link>
              );
              const deleteIcon = (
                <Link to={"/roles"}>
                  <DeleteRoundedIcon />
                </Link>
              );

              return createRow(id, title, readPermission, writePermission, [
                editIcon,
                deleteIcon,
              ]);
            })}
        </tbody>
      </table>
    </div>
  );
}

export default RolesTable;
