import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function BottomBar() {
  const [value, setValue] = React.useState(0);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const handleLogoutConfirmation = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    handleLogout();
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000, // Set a higher z-index value if necessary
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          overflowX: "hidden",
          overflowY: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <BottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          onClick={() => navigate("/profile")}
        />
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate("/home")}
        />
        <BottomNavigationAction
          label="Your Posts"
          icon={<ListAltIcon />}
          onClick={() => navigate("/yourPosts")}
        />
        <BottomNavigationAction
          label="Logout"
          icon={<LogoutIcon />}
          onClick={handleLogoutConfirmation}
        />
      </BottomNavigation>

      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to logout?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
