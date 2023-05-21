import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPost, setNewPost] = useState({
    address: "",
    moveIn: "",
    moveOut: "",
    userPhone: "",
    userEmail: "",
    rent: "",
    comments: "",
    userId: "",
  });

  useEffect(() => {
    let authorization = localStorage.getItem("token");
    if (!authorization) {
      navigate("/login");
    } else {
      // Retrieve user data
      fetch("http://localhost:3000/api/users/jwtAuth", {
        method: "POST",
        headers: {
          Authorization: authorization,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error retrieving user data");
          }
        })
        .then((data) => {
          const userData = data;

          // Set the user ID in the newPost state
          setNewPost((prevPost) => ({
            ...prevPost,
            userId: userData.userId,
          }));

          // Retrieve posts
          fetch("http://localhost:3000/api/posts/getAllPosts", {
            headers: {
              Authorization: authorization,
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Error retrieving posts");
              }
            })
            .then((data) => {
              setPosts(data);
            })
            .catch((error) => {
              console.error("Error retrieving posts:", error);
            });
        })
        .catch((error) => {
          console.error("Error retrieving user data:", error);
        });
    }
  }, [navigate]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleCreatePost = () => {
    let authorization = localStorage.getItem("token");
    axios
      .post("http://localhost:3000/api/posts/createPost", newPost, {
        headers: {
          Authorization: authorization,
        },
      })
      .then((response) => {
        // Handle the successful creation of the post
        console.log("Post created:", response.data);

        // Reset the form and close the dialog
        setNewPost({
          address: "",
          moveIn: "",
          moveOut: "",
          userPhone: "",
          userEmail: "",
          rent: "",
          comments: "",
        });
        setOpenDialog(false);
        // Refresh the page
        window.location.reload();
      })
      .catch((error) => {
        // Handle the error
        console.error("Error creating post:", error);

        // Optionally, display an error message to the user
      });
  };

  const isCreateButtonDisabled =
    Object.values(newPost).some((value) => value === "") ||
    Object.values(newPost).length !== 8;

  return (
    <div>
      <Fab
        color="primary"
        onClick={handleOpenDialog}
        sx={{ position: "fixed", bottom: "55px", right: "16px" }}
      >
        <AddIcon />
      </Fab>

      {posts.map((post) => (
        <Card key={post._id} variant="outlined" sx={{ marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {post.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Move In: {post.moveIn}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Move Out: {post.moveOut}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User Phone: {post.userPhone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User Email: {post.userEmail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rent: {post.rent}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comments: {post.comments}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Address"
            name="address"
            value={newPost.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Move In"
            name="moveIn"
            value={newPost.moveIn}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Move Out"
            name="moveOut"
            value={newPost.moveOut}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="User Phone"
            name="userPhone"
            value={newPost.userPhone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="User Email"
            name="userEmail"
            value={newPost.userEmail}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Rent"
            name="rent"
            value={newPost.rent}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Comments"
            name="comments"
            value={newPost.comments}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleCreatePost}
            disabled={isCreateButtonDisabled}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
