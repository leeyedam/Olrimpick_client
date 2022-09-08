import React from "react";
import { StreamApp, FlatFeed, StatusUpdateForm } from "react-activity-feed";
import Cookies from "universal-cookie";
import "react-activity-feed/dist/index.css";
import { useEffect } from "react";
import Dial from "./MenuDial/Dial";
import FeedForm from "./FeedForm";
import client from "../client";
import FriendsContainer from "../containers/FriendsContainer";
import Notice from "./Notice";

const cookies = new Cookies();
const authToken = cookies.get("token");
const userId = cookies.get("userId");
const userName = cookies.get("username");
const api_key = process.env.REACT_APP_STREAM_API_KEY;
const app_id = process.env.REACT_APP_STREAM_APP_ID;

function MainFeed({ getFollower, getFollow }) {
  const timelineUser = client.feed("user", userId);

  useEffect(() => {
    getFollower();
    getFollow();
  }, []);

  client.user(userId).update({ name: userName, feed_id: userName });
  function callback(data) {
    window.location.reload();
  }

  timelineUser.subscribe(callback);

  return (
    <div
      style={{
        width: "100vw",
        padding: "0",
        margin: "0 auto",
      }}
    >
      <StreamApp apiKey={api_key} appId={app_id} token={authToken}>
        <div className="wrapper box" style={{ position: "sticky", top: 0 }}>
          <Dial />
          <h3
            style={{
              background: "linear-gradient(to right,#ea6e6e, #9375fe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {userName} 'Activity Feed
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FriendsContainer userId={userId} />
            <Notice userId={userId} />
          </div>
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
          Activity={({ activity, feedGroup, userId }) => (
            <>
              <FeedForm
                images={activity.attachments.images}
                text={activity.text}
                actor={activity.actor.data.feed_id}
                time={activity.time}
                userId={userId}
                feedGroup={feedGroup}
                activity={activity}
                timelineUser={timelineUser}
              />
            </>
          )}
        />
      </StreamApp>
    </div>
  );
}

export default MainFeed;
