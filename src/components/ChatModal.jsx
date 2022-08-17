import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Chatting from "./Chatting";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userReducer";
import { Badge } from "@mui/material";

export default function ChatModal(userNumber) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [msgNumber, setMsgNumber] = React.useState(null);
  const anchor = "right";
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    dispatch(setUser(userNumber));
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "100vw" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <LogoutIcon />
            </ListItemIcon>
            <span>HOME</span>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment>
          <Button onClick={toggleDrawer(anchor, true)}>
            {msgNumber ? (
              <Badge badgeContent={msgNumber} color="primary">
                <TextsmsIcon onClick={toggleDrawer(true)} />
              </Badge>
            ) : (
              <Badge color="primary">
                <TextsmsIcon onClick={toggleDrawer(true)} />
              </Badge>
            )}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <Chatting setMsgNumber={setMsgNumber} />
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
