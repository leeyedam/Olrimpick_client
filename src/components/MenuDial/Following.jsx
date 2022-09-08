import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import useUnfollow from "../../hooks/useUnfollow";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Following({ followList }) {
  const [open, setOpen] = React.useState(false);
  const unfollow = useUnfollow;

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
        Following
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
                FollowList
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {followList.map((arr, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Table
                  sx={{ minWidth: 370, maxWidth: 700 }}
                  aria-label="custom pagination table"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ width: "15%", padding: "16px 0 16px 20px" }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {arr[1]}
                        </span>
                      </TableCell>
                      <TableCell sx={{ width: "1%", padding: 0 }}>
                        <Button
                          size="medium"
                          style={{
                            fontWeight: "bold",
                            marginLeft: "7px",
                            marginRight: "10px",
                            fontSize: ".7rem",
                            color: "#ea6e6e",
                          }}
                          onClick={() => unfollow(arr[0], i)}
                        >
                          Unfollow
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ))}
          </List>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
