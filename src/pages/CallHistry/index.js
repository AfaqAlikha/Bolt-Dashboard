import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, update,remove } from "firebase/database";
import CallHistryTable from "../../components/Tabals/CallHistryTable";
import { app } from "../../Firbase";

import { useLocation } from 'react-router-dom';
const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const parentUid = params.get('parentUid');
  const phone = params.get('phone');

  useEffect(() => {
    const getAllUsers = async () => {
      const dbRef = ref(getDatabase(app));

      try {
        const snapshot = await get(child(dbRef, `users/childs/${parentUid}${phone}/recordings`));
       
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





  return (
    <div>
      <div className="mt-3">
        <h5 className="fw-bold">Call Histry</h5>
        <CallHistryTable data={users}  loading={loading}   />
      </div>
    </div>
  );
};

export default Index;
