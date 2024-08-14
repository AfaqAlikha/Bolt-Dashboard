import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import UnLockedCustomerTable from "../../components/Tabals/UnLockedCustomerTable";
import { app } from "../../Firbase";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      const dbRef = ref(getDatabase(app));

      try {
        const snapshot = await get(child(dbRef, "users/childs"));
        if (snapshot.exists()) {
          const allUsers = snapshot.val();
          const filteredUsers = Object.values(allUsers).filter(
            (user) => user.screenLock?.locked === false
          );
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

  const handleDeleteUser = async (parentUid, phone) => {
    const db = getDatabase();
    const childRef = ref(db, `users/childs/${parentUid}${phone}`);
    const parentKidRef = ref(
      db,
      `users/parents/${parentUid}/kids/${parentUid}${phone}`
    );

    try {
      setLoading(true);
      await remove(childRef); // Remove from users/childs
      await remove(parentKidRef); // Remove from parents/kids
      const snapshotUpdated = await get(child(ref(db), "users/childs"));
      if (snapshotUpdated.exists()) {
        const allUsers = snapshotUpdated.val();
        const filteredUsers = Object.values(allUsers).filter(
          (user) => user.screenLock?.locked === false
        );
        setUsers(filteredUsers);
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
        <h5 className="fw-bold">UnLocked Customers</h5>
        <UnLockedCustomerTable
          data={users}
          loading={loading}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </div>
  );
};

export default Index;
