import React, { useState } from "react";
import "../../styles/Table.css"; // Adjust the path if needed
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Index from "../../pages/Dashboard";

const ActiveUserTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const users = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    firstName: "Jane",
    lastName: "Smith",
    username: `@janesmith${index}`,
    isActive: true,
  }));

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-2">
      <div className="d-flex align-items-center justify-content-end">
        <div className="my-3 border border-gray d-flex align-items-center  px-2 py-2 rounded  w-25">
          <input
            style={{ outline: "none", border: "none", width: "100%" }}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <SearchIcon
            style={{
              color: "#888",
            }}
          />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Username</th>
            <th scope="col">Active</th>
            <th scope="col">Actions</th> {/* Updated header for actions */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>
                {user.isActive ? (
                  <>
                    Active
                    <FiberManualRecordIcon
                      style={{ color: "green", fontSize: "18px" }}
                    />
                  </>
                ) : (
                  "Inactive"
                )}
              </td>
              <td>
                <div className="cont">
                  <div className="toggle">
                    <input
                      type="checkbox"
                      id={user.id}
                      className="toggle__input"
                    />
                    <label htmlFor={user.id} className="toggle__label"></label>
                  </div>
                  <button className="btn-delete">
                    <DeleteIcon style={{ color: "red" }} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveUserTable;
