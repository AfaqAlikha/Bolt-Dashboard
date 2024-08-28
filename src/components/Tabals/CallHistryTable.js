import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
const CallHistryTable = ({ data, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    (item.contactName && item.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.phoneNumber && item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.callType && item.callType.toLowerCase().includes(searchTerm.toLowerCase())) 
  );

  return (
    <div className="table-responsive">
      <div className="d-flex align-items-center justify-content-end gap-3 mb-3">
        <div className="my-3 border border-gray d-flex align-items-center px-2 py-2 rounded w-25">
          <input
            style={{ outline: "none", border: "none", width: "100%" }}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon style={{ color: "#888" }} />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Contact Name</th>
            <th>Phone Number</th>
            <th>Call Type</th>
            <th>Call Duration</th>
            <th>Call Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">
                <div className="text-center">
                  <Spinner animation="grow" variant="dark" />
                </div>
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((user, index) => (
              <tr key={index}>
                <td>{user.contactName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.callType}</td>
                <td>{user.callDurationInSeconds} seconds</td>
                <td>{moment(Number(user.callTime)).format('HH:mm:ss')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No call history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CallHistryTable;
