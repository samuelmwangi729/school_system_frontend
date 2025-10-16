import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserDetails } from "../../../redux/userSlice";

const Dashboard: React.FC = () => {
  const user = useAppSelector(selectUserDetails)
  console.log(user)
  return <div>Dashboard</div>;
};

export default Dashboard;
