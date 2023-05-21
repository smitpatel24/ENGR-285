import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  TextField,
  Button,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const YourPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [editPostData, setEditPostData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorization = localStorage.getItem("token");
        if (!authorization) {
          navigate("/login");
        } else {
          const response = await axios.get(
            "http://localhost:3000/api/posts/getPostByUserId",
            {
              headers: {
                Authorization: authorization,
              },
            }
          );
          setPosts(response.data);
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [navigate]);

  const handleEditClick = (post) => {
    setEditPostData(post);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdatePost = async () => {
    try {
      const authorization = localStorage.getItem("token");
      if (!authorization) {
        navigate("/login");
      } else if (editPostData) {
        const response = await axios.put(
          "http://localhost:3000/api/posts/updatePost",
          {
            _id: editPostData._id,
            address: editPostData.address,
            moveIn: editPostData.moveIn,
            moveOut: editPostData.moveOut,
            rent: editPostData.rent,
            userPhone: editPostData.userPhone,
            userEmail: editPostData.userEmail,
            comments: editPostData.comments,
          },
          {
            headers: {
              Authorization: authorization,
            },
          }
        );
        // Handle response
        console.log(response.data);
        // Refresh posts
        window.location.reload();
      }
      handleCloseDialog();
    } catch (error) {
      // Handle error
    }
  };

  const handleDeleteClick = (postId) => {
    setDeletePostId(postId);
    setOpenConfirmationDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const authorization = localStorage.getItem("token");
      if (!authorization) {
        navigate("/login");
      } else {
        await axios.delete("http://localhost:3000/api/posts/deletePost", {
          headers: {
            Authorization: authorization,
          },
          data: {
            _id: deletePostId,
          },
        });
        // Refresh posts
        window.location.reload();
      }
    } catch (error) {
      // Handle error
    } finally {
      handleCloseConfirmationDialog();
    }
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  return (
    <div>
      <h1>Your Posts</h1>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <IconButton onClick={() => handleEditClick(post)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(post._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Address: {post.address}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Move In: {post.moveIn}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Move Out: {post.moveOut}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  User Phone: {post.userPhone}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  User Email: {post.userEmail}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Rett: {post.rent}
                </Typography>
                <Typography variant="body2" component="p">
                  Comments: {post.comments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          {editPostData && (
            <>
              <TextField
                label="Address"
                defaultValue={editPostData.address}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setEditPostData((prevData) => ({
                    ...prevData,
                    address: e.target.value,
                  }))
                }
              />
              <TextField
                label="Move-in Date"
                defaultValue={editPostData.moveIn}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setEditPostData((prevData) => ({
                    ...prevData,
                    moveIn: e.target.value,
                  }))
                }
              />
              <TextField
                label="Move-out Date"
                defaultValue={editPostData.moveOut}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setEditPostData((prevData) => ({
                    ...prevData,
                    moveOut: e.target.value,
                  }))
                }
              />
              <TextField
                label="User Phone"
                defaultValue={editPostData.userPhone}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setEditPostData((prevData) => ({
                    ...prevData,
                    userPhone: e.target.value,
                  }))
                }
              />
              <TextField
                label="User Email"
                defaultValue={editPostData.userEmail}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setEditPostData((prevData) => ({
                    ...prevData,
                    userEmail: e.target.value,
                  }))
                }
              />
              <TextField
                label="Rent"
                defaultValue={editPostData.rent}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setEditPostData((prevData) => ({
                    ...prevData,
                    rent: e.target.value,
                  }))
                }
              />
              <TextField
                label="Comments"
                defaultValue={editPostData.comments}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                onChange={(e) =>
                  setEditPostData((prevData) => ({
                    ...prevData,
                    comments: e.target.value,
                  }))
                }
              />
              <Button variant="contained" onClick={handleUpdatePost}>
                Update
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default YourPosts;
