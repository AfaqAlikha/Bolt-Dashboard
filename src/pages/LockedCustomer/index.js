import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, update } from "firebase/database";
import ActiveUserTable from "../../components/Tabals/ActiveUserTable";
import { app } from "../../Firbase";
import Spinner from 'react-bootstrap/Spinner';

const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getAllUsers = async () => {
      const dbRef = ref(getDatabase(app));

      try {
        const snapshot = await get(child(dbRef, 'users/childs'));
        if (snapshot.exists()) {
          const allUsers = snapshot.val();
          const filteredUsers = Object.values(allUsers).filter(user => user.screenLock?.locked === true);
          setUsers(filteredUsers); 
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

//   const handleToggleChange = async (parentUid, phone, updatedStatus) => {
//     const db = getDatabase();
//     const userRef = ref(db, `users/childs/${parentUid}${phone}/screenLock`);

//     try {
//       setLoading(true); // Show loading indicator
//       const snapshot = await get(userRef);
//       if (snapshot.exists()) {
//         const currentData = snapshot.val();
//         await update(userRef, {
//           ...currentData,
//           locked: updatedStatus
//         });
//         // Re-fetch data to reflect updates
//         const snapshotUpdated = await get(child(ref(db), 'users/childs'));
//         if (snapshotUpdated.exists()) {
//           const allUsers = snapshotUpdated.val();
//           setUsers(Object.values(allUsers));
//         }
//       } else {
//         console.error("No screenLock data found");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     } finally {
//       setLoading(false); // Hide loading indicator
//     }
//   };

  return (
    <div>
      <div className="mt-3">
        <h5 className="fw-bold">Locked Customers</h5>
        <ActiveUserTable data={users} loading={loading}  />
      </div>
    </div>
  );
};

export default Index;
