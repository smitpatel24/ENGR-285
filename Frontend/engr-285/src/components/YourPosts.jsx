import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const YourPosts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let authorization = localStorage.getItem("token");
    if (!authorization) {
      navigate("/login");
    } else {
      console.log("On your posts page");
      // Do something here
    }
  }, [navigate]);
  return <div>YourPosts</div>;
};

export default YourPosts;
