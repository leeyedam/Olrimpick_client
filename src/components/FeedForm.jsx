import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ActivityFooter,
  CommentField,
  CommentItem,
  CommentList,
  LikeButton,
} from "react-activity-feed";
import { makeStyles } from "@material-ui/core/styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Menu, MenuItem } from "@mui/material";
import useUnfollow from "../hooks/useUnfollow";

const useStyles = makeStyles({
  menuPaper: {
    "& .MuiPaper-root": {
      backgroundColor: "rgba(45,45,45,1)",
      color: "#fff",
      width: "30%",
      borderRadius: "15px",
    },
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FeedForm({
  images,
  text,
  actor,
  time,
  activity,
  feedGroup,
  userId,
  timelineUser,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const date = time.substr(0, 10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeFeed = (id) => {
    timelineUser.removeActivity(id);
  };

  const classes = useStyles();
  const unfollow = useUnfollow;

  return (
    <Card sx={{ backgroundColor: "#000" }}>
      <CardHeader
        sx={{ color: "#fff" }}
        avatar={
          <Avatar sx={{ bgcolor: "#dcdcdcde" }} aria-label="recipe"></Avatar>
        }
        action={
          <>
            <IconButton
              aria-label="settings"
              sx={{ color: "#fff" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              className={classes.menuPaper}
            >
              {activity.actor.id === userId ? (
                <MenuItem
                  onClick={() => removeFeed(activity.id)}
                  sx={{
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Delete
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => unfollow(activity.actor.id)}
                  sx={{
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Unfollow
                </MenuItem>
              )}
            </Menu>
          </>
        }
        title={actor}
        subheader={
          <Typography sx={{ fontSize: "12px", color: "#c9c9c9" }}>
            {date}
          </Typography>
        }
      />
      {images.length === 0 ? (
        <>
          <CardContent sx={{ height: "200px" }}>
            <Typography variant="body2" color="#fff">
              {text}
            </Typography>
          </CardContent>
        </>
      ) : images.length > 1 ? (
        <>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            navigation
          >
            {images.map((arr, i) => {
              return (
                <SwiperSlide key={i}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={images[i]}
                    alt="Paella dish"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <CardContent>
            <Typography variant="body2" color="#fff">
              {text}
            </Typography>
          </CardContent>
        </>
      ) : (
        <>
          <CardMedia
            component="img"
            height="350"
            image={images[0]}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="#fff">
              {text}
            </Typography>
          </CardContent>
        </>
      )}

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "#fff" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ActivityFooter
          activity={activity}
          feedGroup={feedGroup}
          userId={userId}
        />
        <CommentField activity={activity} />
        <CommentList
          activityId={activity.id}
          foreign_id={activity.id}
          CommentItem={({ comment }) => (
            <div className="wrapper">
              <CommentItem comment={comment} />
              <LikeButton reaction={comment} />
            </div>
          )}
        />
      </Collapse>
    </Card>
  );
}
