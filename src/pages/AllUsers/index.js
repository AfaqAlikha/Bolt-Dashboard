import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, update,remove } from "firebase/database";
import ActiveUserTable from "../../components/Tabals/ActiveUserTable";
import { app } from "../../Firbase";


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
          setUsers(Object.values(allUsers));
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
    <div>
      <div className="mt-3">
        <h5 className="fw-bold">All Users</h5>
        <ActiveUserTable data={users} loading={loading} onToggleChange={handleToggleChange} onDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
};

export default Index;
