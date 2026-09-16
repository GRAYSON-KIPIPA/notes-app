import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function AdminPage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>ADMIN PAGE</h2>
      <p>Welcome {user?.name}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}

export default AdminPage;
