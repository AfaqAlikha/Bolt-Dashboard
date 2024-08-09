import React from "react";
import ActiveUserTable from "../../components/Tabals/ActiveUserTable";
const index = () => {
  return (
    <div>
      <div className="mt-3">
        <h5 className="fw-bold">UnActive Users</h5>
        <ActiveUserTable />
      </div>
    </div>
  );
};

export default index;
