import React from "react";
import Cookies from "universal-cookie";

import { Auth } from "./components";

import "stream-chat-react/dist/css/index.css";
import "./App.css";
import MainFeedContainer from "./containers/MainFeedContainer";
import chatClient from "./chatClient";

const cookies = new Cookies();
const authToken = cookies.get("token");

if (authToken) {
  chatClient.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}

const App = () => {
  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <MainFeedContainer />
    </div>
  );
};

export default App;
