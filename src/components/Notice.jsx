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
import { Badge } from "@mui/material";
import { useState } from "react";
import client from "../client";
import AlertFeedContainer from "../containers/AlertFeedContainer";

export default function Notice({ userId }) {
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
  const [alertNumber, setAlertNumber] = useState(false);

  const notificationFeed = client.feed("notification", userId);
  notificationFeed.get().then((result) => {
    result.results.length && setAlertNumber(result.results.length);
  });

  notificationFeed.subscribe().then();

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

  const rand1 = Math.random();
  return (
    <div>
      {
        <React.Fragment>
          <Button
            sx={{ padding: 0, minWidth: "27px", mt: "-2px" }}
            onClick={toggleDrawer(anchor, true)}
          >
            {alertNumber ? (
              <Badge badgeContent={alertNumber} color="primary">
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
                <MailIcon
                  color="action"
                  sx={{ fill: `url(#linearColors-${rand1})` }}
                />
              </Badge>
            ) : (
              <Badge color="primary">
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
                <MailIcon
                  color="action"
                  sx={{ fill: `url(#linearColors-${rand1})` }}
                />
              </Badge>
            )}
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <AlertFeedContainer />
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
