import React from "react";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";

import { Auth } from "./components";
import { connect } from "getstream";

import "stream-chat-react/dist/css/index.css";
import "./App.css";
import MainFeed from "./components/MainFeed";

import FriendListContainer from "./components/FriendListContainer";

const cookies = new Cookies();

const apiKey = "adazxgkkh3hb";
const authToken = cookies.get("token");
// const userId = cookies.get("userId");
const client = connect(apiKey, authToken, "1201640");
const clientChat = StreamChat.getInstance(apiKey);

if (authToken) {
  clientChat.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

const App = () => {
  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <FriendListContainer />
      <MainFeed />
    </div>
  );
};

export default App;
