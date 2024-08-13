import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, update,remove } from "firebase/database";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import ActiveUsers from "../../components/cards/ActiveUsers";
import ActiveUserTable from "../../components/Tabals/ActiveUserTable";
import { app } from "../../Firbase";
import Spinner from 'react-bootstrap/Spinner';
const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalActiveUserCount, setTotalActiveUserCount] = useState(0);
  const [totalUnActiveUserCount, setTotalUnActiveUserCount] = useState(0);
  const [totalLockedUserCount, setTotalLockedUserCount] = useState(0);
  const [totalUnLockedUserCount, setTotalUnLockedUserCount] = useState(0);
  useEffect(() => {
    const getAllUsers = async () => {
      const dbRef = ref(getDatabase(app));

      try {
        const snapshot = await get(child(dbRef, 'users/childs'));
        if (snapshot.exists()) {
               // TOTLE  USERS 
          const allUsers = snapshot.val();
          const TOTLEUSERS=Object.values(allUsers)
          setTotalUserCount(TOTLEUSERS.length)
          // TOTLE ACTIVE USERS 
          const filteredUsers = Object.values(allUsers).filter(user => user.kidstatus === true);
          setUsers(filteredUsers); 
          const TOTLEACTIVEUSERS=Object.values(filteredUsers)
          setTotalActiveUserCount(TOTLEACTIVEUSERS.length)
               // TOTLE ACTIVE USERS 
          const filteredUsersunactive = Object.values(allUsers).filter(user => user.kidstatus === false);
          const TOTLUNEACTIVEUSERS=Object.values(filteredUsersunactive)
          setTotalUnActiveUserCount(TOTLUNEACTIVEUSERS.length)
               // TOTLE Loked USERS 

               const filteredUsersLoked = Object.values(allUsers).filter(user => user.screenLock?.locked === true);
               const TOTLUNELOKEDUSER=Object.values(filteredUsersLoked)
               setTotalLockedUserCount(TOTLUNELOKEDUSER.length)
                   // TOTLE Loked USERS 

                   const filteredUsersUnLoked = Object.values(allUsers).filter(user => user.screenLock?.locked === false);
                   const TOTLUNEUNLOKEDUSER=Object.values(filteredUsersUnLoked)
                   setTotalUnLockedUserCount(TOTLUNEUNLOKEDUSER.length)

        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  const handleToggleChange = async (parentUid, phone, updatedStatus) => {
    const db = getDatabase();
    const userRef = ref(db, `users/childs/${parentUid}${phone}/screenLock`);

    try {
      setLoading(true); // Show loading indicator
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const currentData = snapshot.val();
        await update(userRef, {
          ...currentData,
          locked: updatedStatus
        });
        // Re-fetch data to reflect updates
        const snapshotUpdated = await get(child(ref(db), 'users/childs'));
        if (snapshotUpdated.exists()) {
          const allUsers = snapshotUpdated.val();

          setUsers(Object.values(allUsers));
        }
      } else {
        console.error("No screenLock data found");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  const handleDeleteUser = async (parentUid, phone) => {
    const db = getDatabase();
    const childRef = ref(db, `users/childs/${parentUid}${phone}`);
    const parentKidRef = ref(db, `users/parents/${parentUid}/kids/${parentUid}${phone}`);
   
    try {
      setLoading(true);
      await remove(childRef);  // Remove from users/childs
      await remove(parentKidRef); // Remove from parents/kids
      const snapshotUpdated = await get(child(ref(db), 'users/childs'));
      if (snapshotUpdated.exists()) {
        const allUsers = snapshotUpdated.val();
        setUsers(Object.values(allUsers));
      }
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="px-2">
      <div>
      <div className="row gap-2">
  <div
    className="col-sm py-2 px-1 rounded"
    style={{ background: "linear-gradient(to bottom, red, green)" }}
  >
    <Link to="/unactiveUsers" className="text-decoration-none">
      <div className="d-flex flex-column align-items-center">
        <PersonIcon sx={{ fontSize: 40, color: "white" }} />
        <h5 style={{ fontSize: "14px", marginBlock: "5px" }} className="ms-2 text-white fw-bold">
          UNACTIVE USERS
        </h5>
        <p style={{ fontSize: "12px" }} className="ms-2 text-white fw-bold">
          TOTAL: {totalUnActiveUserCount}
        </p>
      </div>
    </Link>
  </div>

  <div
    className="col-sm py-2 px-1 rounded"
    style={{ background: "linear-gradient(to bottom, red, green)" }}
  >
    <Link to="#" className="text-decoration-none">
      <div className="d-flex flex-column align-items-center">
        <LockIcon sx={{ fontSize: 40, color: "white" }} />
        <h5 style={{ fontSize: "14px", marginBlock: "5px" }} className="ms-2 text-white fw-bold">
          LOCK CUSTOMERS
        </h5>
        <p style={{ fontSize: "12px" }} className="ms-2 text-white fw-bold">
          TOTAL: {totalLockedUserCount}
        </p>
      </div>
    </Link>
  </div>

  <div
    className="col-sm py-2 px-1 rounded"
    style={{ background: "linear-gradient(to bottom, green, lightgreen)" }}
  >
    <Link to="#" className="text-decoration-none">
      <div className="d-flex flex-column align-items-center">
        <LockOpenIcon sx={{ fontSize: 40, color: "white" }} />
        <h5 style={{ fontSize: "14px", marginBlock: "5px" }} className="ms-2 text-white fw-bold">
          UNLOCK CUSTOMERS
        </h5>
        <p style={{ fontSize: "12px" }} className="ms-2 text-white fw-bold">
          TOTAL: {totalUnLockedUserCount}
        </p>
      </div>
    </Link>
  </div>

  <div
    className="col-sm py-2 px-1 rounded"
    style={{ background: "linear-gradient(to bottom, green, gray)" }}
  >
    <Link to="/addusers" className="text-decoration-none">
      <div className="d-flex flex-column align-items-center">
        <AddIcon sx={{ fontSize: 40, color: "white" }} />
        <h5 style={{ fontSize: "14px", marginBlock: "5px" }} className="ms-2 text-white fw-bold">
          ADD USER
        </h5>
      </div>
    </Link>
  </div>

  <div
    className="col-sm py-2 px-1 rounded"
    style={{ background: "linear-gradient(to bottom, gray, orange)" }}
  >
    <Link to="/allusers" className="text-decoration-none">
      <div className="d-flex flex-column align-items-center">
        <PersonIcon sx={{ fontSize: 40, color: "white" }} />
        <h5 style={{ fontSize: "14px", marginBlock: "5px" }} className="ms-2 text-white fw-bold">
          ALL USERS
        </h5>
        <p style={{ fontSize: "12px" }} className="ms-2 text-white fw-bold">
          TOTAL: {totalUserCount}
        </p>
      </div>
    </Link>
  </div>

  <div
    className="col-sm py-2 px-1 rounded"
    style={{ background: "linear-gradient(to bottom, green, lightgreen)" }}
  >
    <Link to="/activeUsers" className="text-decoration-none">
      <div className="d-flex flex-column align-items-center">
        <PersonIcon sx={{ fontSize: 40, color: "white" }} />
        <h5 style={{ fontSize: "14px", marginBlock: "5px" }} className="ms-2 text-white fw-bold">
          ACTIVE USERS
        </h5>
        <p style={{ fontSize: "12px" }} className="ms-2 text-white fw-bold">
          TOTAL: {totalActiveUserCount}
        </p>
      </div>
    </Link>
  </div>

  {/* Add another card here if needed */}
</div>

      </div>

      <div className="mt-3">
        <h5 className="fw-bold">Active Users</h5>
        <ActiveUserTable data={users} loading={loading} onToggleChange={handleToggleChange} onDeleteUser={handleDeleteUser} />
      </div>
    </main>
  );
};

export default Index;
