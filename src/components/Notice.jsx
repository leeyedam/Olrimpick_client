import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import AlertFeed from "./AlertFeed";
import { Badge } from "@mui/material";

export default function Notice({ alertNumber, followList }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const anchor = "right";
  const toggleDrawer = (anchor, open) => (event) => {
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
          <Button sx={{ padding: 0 }} onClick={toggleDrawer(anchor, true)}>
            {alertNumber ? (
              <Badge badgeContent={alertNumber} color="primary">
                <MailIcon color="action" />
              </Badge>
            ) : (
              <Badge color="primary">
                <MailIcon color="action" />
              </Badge>
            )}
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <AlertFeed followList={followList} />
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
