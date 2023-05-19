import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let authorization = localStorage.getItem("token");
    if (!authorization) {
      navigate("/login");
    } else {
      console.log("I am in");
      // Do something here
    }
  }, []);
  return <div>Home</div>;
};

export default Home;
