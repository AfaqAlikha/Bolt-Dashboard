// src/pages/index.js
import React, { useState } from "react";
import ActiveUserTable from "../../components/Tabals/ActiveUserTable";
import AddUserModal from "../../components/Modals/AddUserModal";
import "../../App.css";

const Index = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <div className="mt-3">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="fw-bold">Add Users</h5>
          <button className="addbutton" onClick={handleShow}>
            ADD USER
          </button>
        </div>
        <ActiveUserTable />
      </div>

      <AddUserModal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Index;
