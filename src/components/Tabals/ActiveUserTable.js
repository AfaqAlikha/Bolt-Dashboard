import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from 'react-bootstrap/Spinner';
import "../../styles/Table.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LocationModal from "../Modals/LocationModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const ActiveUserTable = ({ data = [], loading, onToggleChange,onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [localLoading, setLocalLoading] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ latitude: 0, longitude: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);


  const handleToggleChange = async (parentUid, phone, currentLockedStatus) => {
    const updatedStatus = !currentLockedStatus;

    // Set local loading state for the specific record
    setLocalLoading(prev => ({ ...prev, [`${parentUid}${phone}`]: true }));

    try {
      await onToggleChange(parentUid, phone, updatedStatus);
      toast.success('Status updated successfully!');
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(' this user status or not update  ');
    } finally {
      // Remove loading state for the specific record
      setLocalLoading(prev => ({ ...prev, [`${parentUid}${phone}`]: false }));
    }
  };


  const handleDeleteUser = async (parentUid, phone) => {
    try {
      await onDeleteUser(parentUid, phone);
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error('This user could not be deleted');
    }
  };


  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await onDeleteUser(userToDelete.parentUid, userToDelete.phone);
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("This user could not be deleted.");
      } finally {
        setShowDeleteModal(false);
        setUserToDelete(null);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };



  const handleShowLocation = (latitude, longitude) => {
    setSelectedLocation({ latitude, longitude });
    setShowLocationModal(true);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
  };


  // Filter users based on search term
  const filteredUsers = data.filter((user) =>
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.parentPhone && user.parentPhone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.mobiletype && user.mobiletype.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.mobileimei && user.mobileimei.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="mt-2">
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-end">
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
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Parent Phone</th>
            <th scope="col">Mobile Type</th>
            <th scope="col">Mobile IMEI</th>
            <th scope="col">Status</th>
            <th scope="col">Location</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                <Spinner animation="grow" variant="dark" />
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                No data found
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name || "NA"}</td>
                <td>{user.phone}</td>
                <td>{user.parentPhone}</td>
                <td>{user.mobiletype}</td>
                <td>{user.mobileimei}</td>
                <td>
                  {user.kidstatus ? (
                    <>
                      Active
                      <FiberManualRecordIcon
                        style={{ color: "green", fontSize: "18px" }}
                      />
                    </>
                  ) : (
                    <>
                      Active
                      <FiberManualRecordIcon
                        style={{ color: "red", fontSize: "18px" }}
                      />
                    </>
                  )}
                </td>
                <td>
                {user.location ? (
                    <>
                      <button
                        className="btn btn-link"
                        onClick={() => handleShowLocation(user.location.latitude, user.location.longitude)}
                      >
                        <VisibilityIcon style={{ color: "green" }} />
                      </button>
                    </>
                  ) : (
                    <>
                    <button
                      className="btn btn-link"
                     
                    >
                      <VisibilityOffIcon style={{ color: "gray" }} />
                    </button>
                  </>
                  )}
                </td>
             
                <td>
                  <div className="cont">
                    <div className="toggle">
                      <input
                        type="checkbox"
                        id={`${user.parentUid}${user.phone}`}
                        className="toggle__input"
                        checked={user.screenLock?.locked || false}
                        onChange={() => handleToggleChange(user.parentUid, user.phone, user.screenLock?.locked || false)}
                      />
                      <label htmlFor={`${user.parentUid}${user.phone}`} className="toggle__label"></label>
                      {localLoading[`${user.parentUid}${user.phone}`] && (
                        <Spinner animation="border" size="sm" />
                      )}
                    </div>
                    <button className="btn-delete" onClick={() => handleShowDeleteModal(user)}>
                      <DeleteIcon style={{ color: "red" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <LocationModal
        show={showLocationModal}
        handleClose={handleCloseLocationModal}
        latitude={selectedLocation.latitude}
        longitude={selectedLocation.longitude}
      />

       {/* Delete Confirmation Modal */}
       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActiveUserTable;
