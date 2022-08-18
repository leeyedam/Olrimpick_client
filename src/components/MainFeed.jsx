import React, { useState } from "react";
import {
  StreamApp,
  FlatFeed,
  StatusUpdateForm,
  LikeButton,
  Activity,
  ActivityFooter,
  CommentItem,
  CommentField,
  CommentList,
} from "react-activity-feed";
import Cookies from "universal-cookie";
import "react-activity-feed/dist/index.css";
import { connect } from "getstream";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Notice from "./Notice";
import { setFollower } from "../store/followerReducer";
import { useEffect } from "react";
import Dial from "./Dial";
import FriendsListModal from "./FriendsListModal";

const cookies = new Cookies();
const authToken = cookies.get("token");
const userId = cookies.get("userId");
const userName = cookies.get("username");
const apiKey = "adazxgkkh3hb";
const appId = "1201640";

function MainFeed() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [userNumber, setUserNumber] = useState("");
  const [openNotice, setOpenNotice] = React.useState(false);
  const [followerList, setFollowerList] = useState(() => []);
  const [followList, setFollowList] = useState(() => []);
  const [alertNumber, setAlertNumber] = useState(false);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const client = connect(apiKey, authToken, appId);
  const timelineUser = client.feed("user", userId);

  useEffect(() => {
    fetchFollower();
    fetchFollowing();
    settingUserList();
  }, []);

  const fetchFollower = useCallback(async () => {
    const responseFollower = await timelineUser.followers();

    if (followerList.length >= responseFollower.results.length) {
      setFollowerList((prev) => [...prev]);
    } else {
      responseFollower.results.forEach(async (li, i) => {
        const res = await client.user(li.feed_id.substring(5)).get();

        if (followerList.length) {
          setFollowerList([]);
        }
        await setFollowerList((prev) => [...prev, [res.id, res.data.feed_id]]);
      });
    }
  }, [timelineUser]);

  const fetchFollowing = useCallback(async () => {
    const responseFollow = await timelineUser.following();

    if (followList.length >= responseFollow.results.length) {
      setFollowList((prev) => [...prev]);
    } else {
      responseFollow.results.forEach(async (li, i) => {
        const res = await client.user(li.target_id.substring(5)).get();
        if (followList.length) {
          setFollowList([]);
        }
        await setFollowList((prev) => [
          ...prev,
          [li.target_id.substring(5), res.data.feed_id],
        ]);
      });
    }
  }, [timelineUser]);

  const settingUserList = async () => {
    setLoading(true);
    userList.length && setUserList([]);
    for (let i = 0; i < followerList.length; i++) {
      followList.forEach((arr, idx) => {
        arr[0] === followerList[i][0] && setUserList((pre) => [...pre, arr]);
      });
    }
    setLoading(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenNotice(newOpen);
  };

  const handleClickOpenModal = (i) => {
    setOpenModal(true);
    setUserNumber(userList[i][0]);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserNumber("");
  };

  client.user(userId).update({ name: userName, feed_id: userName });
  function callback(data) {
    window.location.reload();
  }

  timelineUser.subscribe(callback);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const friendsList = useCallback(
    async (event) => {
      if (loading) return;
      setLoading(true);
      setAnchorEl(event.currentTarget);
      settingUserList();

      setLoading(false);
    },
    [timelineUser]
  );

  const sending = async () => {
    client.reactions.add(
      "like",
      userId,
      { text: "@thierry great post!" },
      { targetFeeds: [`notification:${userNumber}`] }
    );

    setOpenModal(false);
  };

  const notificationFeed = client.feed("notification", userId);
  notificationFeed.get().then((result) => {
    result.results.length && setAlertNumber(result.results.length);
  });

  const unfollow = async (userNumber, i) => {
    await timelineUser.unfollow("user", userNumber);
    window.location.reload();
  };
  const following = async (userNumber) => {
    try {
      dispatch(setFollower(userNumber));
      client.reactions.add(
        "follow",
        userId,
        {},
        { targetFeeds: [`notification:${userNumber}`] }
      );

      const myFeed = client.feed("user", userId, authToken);
      myFeed.follow("user", userNumber);

      await myFeed.following({ filter: [`user:${userNumber}`] });

      window.location.reload();
    } catch (err) {
      alert("이미 팔로우한 상태입니다.");
    }
  };

  notificationFeed.subscribe().then();

  return (
    <div
      style={{
        width: "100vw",
        padding: "0",
        margin: "0 auto",
      }}
    >
      <StreamApp apiKey={apiKey} appId={appId} token={authToken}>
        <div className="wrapper box">
          <Dial
            followList={followList}
            followerList={followerList}
            following={following}
            unfollow={unfollow}
          />
          <h3>{userName} 'Activity Feed</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={friendsList}
            >
              <SwitchAccountIcon />
            </Button>
            <Notice
              openNotice={openNotice}
              toggleDrawer={toggleDrawer}
              alertNumber={alertNumber}
              followList={followList}
            />
          </div>
          <FriendsListModal
            userList={userList}
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            followList={followList}
            loading={loading}
            handleClickOpenModal={handleClickOpenModal}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            sending={sending}
            unfollow={unfollow}
          />
        </div>
        <StatusUpdateForm
          emojiI18n={{
            search: "Type here to search...",
            categories: { recent: "Recent Emojis" },
          }}
        />
        <FlatFeed
          notify
          feedGroup="user"
          userId={userId}
          options={{
            limit: 6,
            withOwnChildren: true,
            withRecentReactions: true,
            reactions: { recent: true },
          }}
          Activity={({ activity, feedGroup, userId: [userId] }) => (
            <Activity
              activity={activity}
              feedGroup={feedGroup}
              userId={userId}
              Footer={() => (
                <>
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
                </>
              )}
            />
          )}
        />
      </StreamApp>
    </div>
  );
}

export default MainFeed;
