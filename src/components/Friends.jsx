import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import ChatModal from "./Chat/ChatModal";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import useUnfollow from "../hooks/useUnfollow";
import { useState } from "react";
import { useCallback } from "react";
import client from "../client";

const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: "30px 30px 0 0",
    margin: "0 auto",
    minHeight: "280px",
    maxHeight: "400px",
    paddingTop: "100px",
  },
});

export default function Friends({ followerList, followList, userId }) {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userNumber, setUserNumber] = useState("");

  const handleClickOpenModal = (i) => {
    setOpenModal(true);
    setUserNumber(userList[i][0]);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserNumber("");
  };

  const sending = async () => {
    client.reactions.add(
      "like",
      userId,
      { text: "@thierry great post!" },
      { targetFeeds: [`notification:${userNumber}`] }
    );

    setOpenModal(false);
  };

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const unfollow = useUnfollow;

  const friendsList = useCallback(
    async (event) => {
      if (loading) return;
      setLoading(true);
      userList.length && setUserList([]);
      for (let i = 0; i < followerList.length; i++) {
        followList.forEach((arr, idx) => {
          arr[0] === followerList[i][0] && setUserList((pre) => [...pre, arr]);
        });
      }
      setLoading(false);
    },
    [loading, userList.length, followerList, followList]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    friendsList();
    setState({ ...state, [anchor]: open });
  };

  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 25,
    left: "calc(50% - 15px)",
  }));

  const anchor = "bottom";
  const classes = useStyles();
  const rand1 = Math.random();
  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(anchor, true)} sx={{ minWidth: "55px" }}>
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
          <SwitchAccountIcon sx={{ fill: `url(#linearColors-${rand1})` }} />
        </Button>

        <Drawer
          className="friends-drawer"
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          classes={{ paper: classes.drawerPaper }}
        >
          <Puller />
          {userList.length === 0 && !loading ? (
            <Table
              sx={{ height: "300px" }}
              aria-label="custom pagination table"
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ padding: "0px 20px 70px 20px" }}
                  >
                    <span
                      style={{
                        background:
                          "linear-gradient(to right,#ea6e6e,#d27099, #9375fe)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      <svg width={0} height={0}>
                        <linearGradient
                          id="linearColors"
                          x1={1}
                          y1={0}
                          x2={0}
                          y2={1}
                        >
                          <stop
                            offset={0}
                            stopColor=" rgba(234, 110, 110, 1)"
                          />
                          <stop offset={1} stopColor="rgba(147, 117, 254, 1)" />
                        </linearGradient>
                      </svg>
                      <AssignmentIndIcon
                        fontSize="large"
                        sx={{
                          fill: "url(#linearColors)",
                          verticalAlign: "middle",
                          mr: 1.5,
                        }}
                      />
                      친구 목록이 없습니다.
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <>
              {loading ? (
                <div style={{ width: "98%", padding: "20px" }}>
                  <LinearProgress
                    color="primary"
                    sx={{ borderRadius: "20px" }}
                  />
                  <p style={{ textAlign: "center" }}>Loading...</p>
                </div>
              ) : (
                userList.map((li, i) => {
                  return (
                    <div className="listBox" key={i}>
                      <Table
                        sx={{ minWidth: 370, maxWidth: 700 }}
                        aria-label="custom pagination table"
                      >
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{ width: "27%", padding: "16px 0 16px 20px" }}
                            >
                              <span
                                style={{
                                  background:
                                    "linear-gradient(to right,#ea6e6e,#d27099, #9375fe)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  fontWeight: "bold",
                                }}
                              >
                                {li[1]}
                              </span>
                            </TableCell>
                            <TableCell sx={{ width: "5%", padding: 0 }}>
                              <Button onClick={() => handleClickOpenModal(i)}>
                                <svg width={0} height={0}>
                                  <linearGradient
                                    id="linearColors"
                                    x1={1}
                                    y1={0}
                                    x2={0}
                                    y2={1}
                                  >
                                    <stop
                                      offset={0}
                                      stopColor=" rgba(234, 110, 110, 1)"
                                    />
                                    <stop
                                      offset={1}
                                      stopColor="rgba(147, 117, 254, 1)"
                                    />
                                  </linearGradient>
                                </svg>
                                <TelegramIcon
                                  sx={{ fill: "url(#linearColors)" }}
                                />
                              </Button>
                              <Dialog
                                open={openModal}
                                onClose={handleCloseModal}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"근황올림픽"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    친구에게 근황을 물어보세요! 상대방 알림
                                    페이지에 알림이 갑니다.
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick={() => {
                                      sending();
                                    }}
                                  >
                                    보내기
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </TableCell>
                            <TableCell sx={{ width: "5%", padding: 0 }}>
                              <ChatModal userNumber={li[0]} />
                            </TableCell>
                            <TableCell sx={{ width: "5%", padding: 0 }}>
                              <Button
                                size="medium"
                                style={{
                                  background:
                                    "linear-gradient(to right,#ea6e6e,#d27099, #9375fe)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  fontWeight: "bold",
                                  marginLeft: "7px",
                                  marginRight: "10px",
                                  fontSize: ".7rem",
                                }}
                                onClick={() => unfollow(li[0], i)}
                              >
                                Unfollow
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  );
                })
              )}
            </>
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
