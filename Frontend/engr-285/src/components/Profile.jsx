import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid } from "@mui/material";
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
          "http://localhost:3000/api/users/updateUserProfile",
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
    <Grid container spacing={2}>
      <Grid item xs={12} textAlign="center">
        <h2>Profile</h2>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone No"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleUpdate} fullWidth>
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
