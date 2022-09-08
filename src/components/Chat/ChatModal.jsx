import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Chatting from "./Chatting";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Badge, Toolbar } from "@mui/material";
import { useEffect } from "react";
import chatClient from "../../chatClient";

export default function ChatModal({ userNumber }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [msgNumber, setMsgNumber] = React.useState(null);
  const anchor = "right";
  useEffect(() => {
    (async () => {
      try {
        const channelResponse = await chatClient.queryChannels({
          type: "messaging",
          members: { $in: [chatClient._user.id] },
        });

        const chatRoom = channelResponse.filter(
          (c) =>
            Object.keys(c.state.members).includes(userNumber) &&
            Object.keys(c.state.members).includes(chatClient._user.id)
        );
        if (chatRoom.length === 0) {
          return;
        }
        const unread =
          chatRoom[0].state.read[chatClient._user.id].unread_messages;
        setMsgNumber(unread);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userNumber]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    open === false && setMsgNumber(null);

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <AppBar
      position="sticky"
      sx={{
        width: "100vw",
        background: "linear-gradient(to right,#ea6e6e, #9375fe)",
      }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Toolbar>
        <Button sx={{ width: "100vw", justifyContent: "left" }}>
          <LogoutIcon />
          <span
            style={{ color: "#fff", marginLeft: "5px", fontWeight: "bold" }}
          >
            HOME
          </span>
        </Button>
        <Divider />
      </Toolbar>
    </AppBar>
  );

  return (
    <div>
      {
        <React.Fragment>
          <Button onClick={toggleDrawer(anchor, true)}>
            {msgNumber ? (
              <Badge badgeContent={msgNumber} color="primary">
                <svg width={0} height={0}>
                  <linearGradient id="linearColors" x1={0} y1={1} x2={1} y2={1}>
                    <stop offset={0} stopColor=" rgba(234, 110, 110, 1)" />
                    <stop offset={1} stopColor="rgba(147, 117, 254, 1)" />
                  </linearGradient>
                </svg>
                <TextsmsIcon
                  onClick={toggleDrawer(true)}
                  sx={{ fill: "url(#linearColors)" }}
                />
              </Badge>
            ) : (
              <Badge color="primary">
                <svg width={0} height={0}>
                  <linearGradient id="linearColors" x1={0} y1={1} x2={1} y2={1}>
                    <stop offset={0} stopColor=" rgba(234, 110, 110, 1)" />
                    <stop offset={1} stopColor="rgba(147, 117, 254, 1)" />
                  </linearGradient>
                </svg>
                <TextsmsIcon
                  onClick={toggleDrawer(true)}
                  sx={{ fill: "url(#linearColors)" }}
                />
              </Badge>
            )}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{ zIndex: 1300 }}
          >
            {list(anchor)}
            <Chatting userNumber={userNumber} />
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
