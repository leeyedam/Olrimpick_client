import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearhchModal from "./Search/SearhchModal";
import AboutApp from "./AboutApp";
import Cookies from "universal-cookie";
import IdModal from "./IdModal";
import FollowerContainer from "../../containers/FollowerContainer";
import FollowingContainer from "../../containers/FollowingContainer";

const cookies = new Cookies();
const userId = cookies.get("userId");

export default function Dial() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const anchor = "left";

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        <>
          <ListItem disablePadding>
            <ListItemButton>
              <SearhchModal />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <AboutApp />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <FollowingContainer />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <FollowerContainer />
            </ListItemButton>
          </ListItem>
        </>
      </List>
      <Divider />
      <List sx={{ marginLeft: "7px" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <IdModal userId={userId} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Button
              sx={{
                width: "220px",
                justifyContent: "left",
                fontWeight: 400,
                fontSize: "1rem",
                textTransform: "none",
                color: "#1f1f1f",
              }}
              onClick={logout}
            >
              Logout
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const rand1 = Math.random();

  return (
    <div>
      {
        <React.Fragment>
          <Button
            onClick={toggleDrawer(anchor, true)}
            sx={{ justifyContent: "left" }}
          >
            <svg width={0} height={0}>
              <linearGradient
                id={`linearColors-${rand1}`}
                x1={0}
                y1={1}
                x2={1}
                y2={1}
              >
                <stop offset={0} stopColor=" rgba(234, 110, 110, 1)" />
                <stop offset={1} stopColor="rgba(147, 117, 254, 1)" />
              </linearGradient>
            </svg>
            <MenuIcon sx={{ fill: `url(#linearColors-${rand1})` }} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
