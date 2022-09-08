import React, { useState } from "react";
import {
  StreamApp,
  NotificationFeed,
  AttachedActivity,
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useFeedClient from "../hooks/useFeedClient";

function AlertFeed({ followList }) {
  const client = useFeedClient();
  const user = client.feed("notification", client.userId);

  const [openModal, setOpenModal] = React.useState(false);
  const [openAlertModal, setOpenAlertModal] = React.useState(false);

  const [name, setName] = useState("");

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleClickOpenAlertModal = () => {
    setOpenAlertModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    window.location.reload();
  };

  const followClick = async (follower) => {
    if (followList.filter((arr) => arr[0] === follower).length) {
      alert("이미 팔로우한 상태입니다.");
      return;
    }
    try {
      client.reactions.add(
        "follow",
        client.userId,
        {},
        { targetFeeds: [`notification:${follower}`] }
      );

      const myFeed = client.feed("user", client.userId, client.userToken);
      myFeed.follow("user", follower);

      await myFeed.following({ filter: [`user:${follower}`] });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: "100vw", margin: "0 auto" }}>
      <StreamApp
        apiKey={client.apiKey}
        appId={client.appId}
        token={client.userToken}
      >
        <NotificationFeed
          Group={(props) => (
            <>
              <Button
                sx={{
                  width: "100vw",
                  borderBottom: ".8px solid #fff",
                  backgroundColor: "#e4e4e4",
                }}
                onClick={() => {
                  setName(props.activityGroup.activities[0].actor.data.feed_id);
                  props.activityGroup.activities[0].verb === "like"
                    ? handleClickOpenModal()
                    : handleClickOpenAlertModal();
                  props.activityGroup.activities.forEach((arr) => {
                    user.removeActivity(arr.id);
                  });
                }}
              >
                <AttachedActivity
                  style={{ backgroundColor: "transparent" }}
                  activity={{
                    attachments: {
                      images: [],
                    },
                    object:
                      props.activityGroup.verb === "like"
                        ? `${props.activityGroup.activities[0].actor.data.feed_id}님이 근황을 궁금해해요.`
                        : `${props.activityGroup.activities[0].actor.data.feed_id}님이 팔로우를 했어요.`,
                    actor: {
                      data: {
                        name:
                          props.activityGroup.activities[0].verb === "like"
                            ? "Alert"
                            : "Follow",
                      },
                    },
                    verb: "post",
                  }}
                />
              </Button>
              {props.activityGroup.verb === "like" ? (
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
                      똑똑!! 잘지내시나요? 당신의 소중한 일상을 {name}님이
                      궁금해합니다. 시간 되실 때 일상 사진 혹은 근황을 공유해
                      보세요!
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog
                  open={openAlertModal}
                  onClose={setOpenAlertModal}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"근황올림픽"}
                  </DialogTitle>

                  <>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {name}님이 팔로우를 했습니다. 맞팔을하면 채팅 및
                        근황묻기가 가능합니다!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() =>
                          followClick(
                            props.activityGroup.activities[0].actor.id
                          )
                        }
                      >
                        Follow
                      </Button>
                      <Button onClick={handleCloseModal}>Close</Button>
                    </DialogActions>
                  </>
                </Dialog>
              )}
            </>
          )}
        />
      </StreamApp>
    </div>
  );
}

export default AlertFeed;
