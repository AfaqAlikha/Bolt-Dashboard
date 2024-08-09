import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import ActiveUsers from "../../components/cards/ActiveUsers";
import ActiveUserTable from "../../components/Tabals/ActiveUserTable";
const Index = () => {
  return (
    <main>
      <div className="">
        <div className="row">
          <div className="col-8">
            <div className="row gap-2">
              <div
                className="col-sm py-5 px-1 rounded"
                style={{
                  background: "linear-gradient(to bottom, green, gray)",
                }}
              >
                <Link to="/addusers" className="text-decoration-none">
                  <div className="d-flex flex-column align-items-center">
                    <AddIcon sx={{ fontSize: 60, color: "white" }} />
                    <h5 className="ms-2 fs-5 text-white fw-bold">ADD USER</h5>
                  </div>
                </Link>
              </div>
              <div
                className="col-sm py-5 px-1 rounded"
                style={{
                  background: "linear-gradient(to bottom, gray, orange)",
                }}
              >
                <Link to="/allusers" className="text-decoration-none">
                  <div className="d-flex flex-column align-items-center">
                    <PersonIcon sx={{ fontSize: 60, color: "white" }} />
                    <h5 className="ms-2 fs-5 text-white fw-bold">ALL USERS</h5>
                  </div>
                </Link>
              </div>
              <div
                className="col-sm py-5 px-1 rounded"
                style={{
                  background: "linear-gradient(to bottom, green, lightgreen)",
                }}
              >
                <Link to="/activeUsers" className="text-decoration-none">
                  <div className="d-flex flex-column align-items-center">
                    <PersonIcon sx={{ fontSize: 60, color: "white" }} />
                    <h5 className="ms-2 fs-5 text-white fw-bold">
                      ACTIVE USERS
                    </h5>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row gap-3 my-3">
              <div
                className="col-sm py-5 px-1 rounded"
                style={{ background: "linear-gradient(to bottom, red, green)" }}
              >
                <Link to="/unactiveUsers" className="text-decoration-none">
                  <div className="d-flex flex-column align-items-center">
                    <PersonIcon sx={{ fontSize: 60, color: "white" }} />
                    <h5 className="ms-2 fs-5 text-white fw-bold">
                      UNACTIVE USERS
                    </h5>
                  </div>
                </Link>
              </div>
              <div
                className="col-sm py-5 px-1 rounded"
                style={{ background: "linear-gradient(to bottom, red, green)" }}
              >
                <Link to="#" className="text-decoration-none">
                  <div className="d-flex flex-column align-items-center">
                    <LockIcon sx={{ fontSize: 60, color: "white" }} />
                    <h5 className="ms-2 fs-5 text-white fw-bold">
                      LOCK CUSTOMERS
                    </h5>
                  </div>
                </Link>
              </div>
              <div
                className="col-sm py-5 px-1 rounded"
                style={{
                  background: "linear-gradient(to bottom, green, lightgreen)",
                }}
              >
                <Link to="#" className="text-decoration-none">
                  <div className="d-flex flex-column align-items-center">
                    <LockOpenIcon sx={{ fontSize: 60, color: "white" }} />
                    <h5 className="ms-2 fs-5 text-white fw-bold">
                      UNLOCK CUSTOMERS
                    </h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-4">
            <ActiveUsers />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h5 className="fw-bold">Active Users</h5>
        <ActiveUserTable />
      </div>
    </main>
  );
};

export default Index;
