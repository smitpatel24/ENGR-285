import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

export default function BottomBar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Recents"
          icon={<RestoreIcon />}
          onClick={() => navigate("/home")}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          onClick={() => navigate("/profile")}
        />
        <BottomNavigationAction
          label="Nearby"
          icon={<LocationOnIcon />}
          onClick={() => navigate("/yourPosts")}
        />
      </BottomNavigation>
    </Box>
  );
}
