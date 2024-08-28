import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, child, get } from "firebase/database";
import Switch from "react-switch";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
const AdminUserTable = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "users/admin"));
        if (snapshot.exists()) {
          const adminsData = Object.keys(snapshot.val()).map((key) => ({
            uid: key,
            ...snapshot.val()[key],
          }));
          setAdmins(adminsData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleActive = async (admin) => {
    const db = getDatabase();
    const adminRef = ref(db, `users/admin/${admin.uid}`);
    try {
      await set(adminRef, { ...admin, active: !admin.active });
      setAdmins((prevAdmins) =>
        prevAdmins.map((adm) =>
          adm.uid === admin.uid ? { ...adm, active: !adm.active } : adm
        )
      );
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  // Filter admins based on search term
  const filteredAdmins = admins.filter((admin) =>
    (admin.email && admin.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (admin.category && admin.category.toLowerCase().includes(searchTerm.toLowerCase()))||
    (admin.parentPhone && admin.parentPhone.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <th>Email</th>
          <th>Parent Phone</th>
          <th>Category</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="4">
              <div className="text-center">
                <Spinner animation="grow" variant="dark" />
              </div>
            </td>
          </tr>
        ) : filteredAdmins.length > 0 ? (
          filteredAdmins.map((admin) => (
            <tr key={admin.uid}>
              <td>{admin.email}</td>
              <td>{admin.parentPhone}</td>
              <td>{admin.category}</td>
              <td>
                <Switch
                  checked={admin.active}
                  onChange={() => handleToggleActive(admin)}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={20}
                  width={48}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No admin users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
};

export default AdminUserTable;
