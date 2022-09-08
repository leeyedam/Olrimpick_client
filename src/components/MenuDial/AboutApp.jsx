import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import SendIcon from "@mui/icons-material/Send";
import TextsmsIcon from "@mui/icons-material/Textsms";
import MailIcon from "@mui/icons-material/Mail";
import { createTheme, ThemeProvider } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AboutApp() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          width: "220px",
          justifyContent: "left",
          fontWeight: 400,
          fontSize: "1rem",
          textTransform: "none",
          color: "#1f1f1f",
        }}
        onClick={handleClickOpen}
      >
        About app
      </Button>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "#000" },
          },
        })}
      >
        <Dialog
          fullScreen
          sx={{ backgroundColor: "#000" }}
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative", backgroundColor: "#2c2c30" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                About app
              </Typography>
            </Toolbar>
          </AppBar>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "0 20px",
            }}
          >
            <ListItem sx={{ justifyContent: "left" }}>
              <p style={{ color: "#fff", fontWeight: "bold" }}>
                "근황을 올리는 올림픽"
              </p>
            </ListItem>
            <Divider sx={{ borderColor: "#7f7f7f" }} />
            <ListItem>
              <p style={{ color: "#fff", lineHeight: "24px" }}>
                코로나로 인해 자주 못 만나고, 바쁜 일상 때문에 안부 묻기가 혹시
                어려우셨나요? <br />
                서로 시간을 내서 대화를 하기 어렵다면 "당신의 근황을
                궁금해합니다"라는 마음을 담아 근황 묻기를 이용해 보세요! <br />
                상대방의 근황 알림 창에 차곡차곡 쌓여서 상대방이 시간이 될 때
                확인하고 글이나 사진을 업로드하는 사이트입니다.
                <br />
                단, 대화 및 근황 묻기는 서로 맞팔이 된 상황에서만 가능합니다.
              </p>
            </ListItem>
            <ListItem sx={{ justifyContent: "left" }}>
              <p style={{ color: "#fff", fontWeight: "bold" }}>HOW TO USE</p>
            </ListItem>
            <Divider sx={{ borderColor: "#7f7f7f" }} />
            <ListItem>
              <p style={{ color: "#fff", lineHeight: "24px" }}>
                ID 창에 들어가서 발급된 아이디를 복사 후 친구에게 공유해 줍니다.
                공유된 아이디를 검색하여 팔로우를 합니다.
              </p>
            </ListItem>
            <ListItem>
              <SwitchAccountIcon sx={{ color: "#fff" }} />
              <p
                style={{
                  color: "#fff",
                  lineHeight: "24px",
                  marginLeft: "9px",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                서로 맞팔을하면 친구목록에 등록이 됩니다.
              </p>
            </ListItem>
            <ListItem>
              <SendIcon sx={{ color: "#fff" }} />
              <p
                style={{
                  color: "#fff",
                  lineHeight: "24px",
                  marginLeft: "9px",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                근황 묻기 버튼을 눌러서 근황을 물어보세요!
              </p>
            </ListItem>
            <ListItem>
              <TextsmsIcon sx={{ color: "#fff" }} />
              <p
                style={{
                  color: "#fff",
                  lineHeight: "24px",
                  marginLeft: "9px",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                대화창 버튼을 눌러서 대화를 해보세요!
              </p>
            </ListItem>
            <ListItem>
              <MailIcon sx={{ color: "#fff" }} />
              <p
                style={{
                  color: "#fff",
                  lineHeight: "24px",
                  marginLeft: "9px",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                알림창으로 가는 버튼입니다.
              </p>
            </ListItem>
          </List>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
