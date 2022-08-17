import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Avatar } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Follower({
  followerList,
  following,
  unfollow,
  followList,
}) {
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
        Follower
      </Button>
      <Dialog
        fullScreen
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
              FollowerList
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {followerList.map((arr, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "17px",
              }}
            >
              <Avatar
                sx={{ width: 36, height: 36, marginRight: "1.5rem" }}
                src="/broken-image.jpg"
              />
              <ListItem sx={{ width: 180 }}>
                <ListItemText primary={arr[1]} />
              </ListItem>
              <Divider />
              {followList.filter((user) => user[0] === arr[0]).length ? (
                <ListItem
                  button
                  sx={{ width: 110, textAlign: "left" }}
                  onClick={() => {
                    unfollow(arr[0]);
                  }}
                >
                  <ListItemText primary="Unfollow" />
                </ListItem>
              ) : (
                <ListItem
                  button
                  sx={{ width: 110, textAlign: "left" }}
                  onClick={() => {
                    following(arr[0]);
                  }}
                >
                  <ListItemText primary="Follow" />
                </ListItem>
              )}
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
