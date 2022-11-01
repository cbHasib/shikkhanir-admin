import React, { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      Dashboard
      <h2>fgfghg</h2>
    </div>
  );
};

export default Dashboard;
