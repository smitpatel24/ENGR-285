import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let authorization = localStorage.getItem("token");
    if (!authorization) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:3000/api/users/jwtAuth", null, {
          headers: {
            Authorization: authorization,
          },
        })
        .then((response) => {
          setUserData(response.data);
          console.log(response.data.userId);
          axios
            .get("http://localhost:3000/api/users/getOneUser", {
              headers: {
                Authorization: authorization,
              },
            })
            .then((response) => {
              const { firstName, lastName, phoneNo } = response.data;
              setFirstName(firstName);
              setLastName(lastName);
              setPhoneNo(phoneNo);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error("Error retrieving user data:", error);
        });
    }
  }, [navigate]);

  const handleUpdate = () => {
    let authorization = localStorage.getItem("token");
    if (!authorization) {
      navigate("/login");
    } else {
      axios
        .put(
          "http://localhost:3000/api/users/updateUser",
          {
            _id: userData.userId,
            firstName: firstName,
            lastName: lastName,
            phoneNo: phoneNo,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authorization,
            },
          }
        )
        .then((response) => {
          // Handle successful update
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  return (
    <div>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Phone No"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <Button variant="contained" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default Profile;
