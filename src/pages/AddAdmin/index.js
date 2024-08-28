import React, { useEffect, useState } from "react";

import AdminUserTable from "../../components/Tabals/AdminUserTable";
import AddAdminModal from "../../components/Modals/AddAdminModal";
import "../../App.css";

const Index = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


 

 

  return (
    <div>
      <div className="mt-3">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="fw-bold">Add Admin</h5>
          <button className="addbutton" onClick={handleShow}>
            Add Admin
          </button>
        </div>
        <AdminUserTable/>
      </div>

      <AddAdminModal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Index;
