import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "../../styles/activeuser.css";
import { Link } from "react-router-dom";
const ActiveUsers = () => {
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        background: "white",
        borderRadius: "7px",
        padding: "10px 12px",
      }}
    >
      <h5 className="fw-bold">Active Users</h5>
      {Array.from({ length: 8 }).map((_, index) => {
        return (
          <Link
            key={index}
            className="d-flex align-items-center justify-content-between gap-2 text-decoration-none px-2 py-1 rounded card-hover"
          >
            <div className="d-flex align-items-center gap-2">
              <img
                src="/baby.png"
                alt="userImage"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Afaq Ali
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FiberManualRecordIcon
                style={{ color: "green", fontSize: "18px" }}
              />
              <p style={{ margin: 0, fontSize: "14px", color: "black" }}>
                Active
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ActiveUsers;
