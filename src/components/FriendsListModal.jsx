import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatModal from "./ChatModal";

function FriendsListModal({
  userList,
  open,
  anchorEl,
  handleClose,
  followList,
  loading,
  openModal,
  handleClickOpenModal,
  handleCloseModal,
  sending,
  unfollow,
}) {
  return (
    <>
      {userList.length === 0 && followList.length === 0 && !loading ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Typography variant="body2" color="#fff" padding={3}>
            친구목록이 없습니다.
          </Typography>
        </Menu>
      ) : (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem style={{ color: "#b4b4b4", fontWeight: "bold" }}>
            Friends
          </MenuItem>
          <Divider sx={{ borderColor: "#7f7f7f" }} />
          {userList.map((li, i) => {
            return (
              <div className="listBox" key={i}>
                <MenuItem>{li[1]}</MenuItem>
                <Button onClick={() => handleClickOpenModal(i)}>
                  <SendIcon />
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
                      친구에게 근황을 물어보세요! 상대방 알림 페이지에 알림이
                      갑니다.
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
                <ChatModal userNumber={li[0]} />
                <Button
                  size="medium"
                  style={{
                    color: "#ff333a",
                    fontWeight: "bold",
                    marginLeft: "7px",
                    fontSize: ".7rem",
                  }}
                  onClick={() => unfollow(li[0], i)}
                >
                  Unfollow
                </Button>
              </div>
            );
          })}
        </Menu>
      )}
    </>
  );
}

export default FriendsListModal;
