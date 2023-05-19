import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let authorization = localStorage.getItem("token");
    if (!authorization) {
      navigate("/login");
    } else {
      console.log("On profile page");
      // Do something here
    }
  }, []);
  return <div>Profile</div>;
};

export default Profile;
