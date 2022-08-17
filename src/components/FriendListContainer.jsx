import React from "react";
import Cookies from "universal-cookie";

import LogoutIcon from "../assets/logout.png";
import FriendSearch from "./FriendSearch";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <MilitaryTechIcon fontSize="large" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);

const AppHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Friend Search</p>
  </div>
);

const FriendListContent = () => {
  const apiKey = "adazxgkkh3hb";

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <AppHeader />
        <FriendSearch />
      </div>
    </>
  );
};

const FriendListContainer = () => {
  return (
    <>
      <div className="channel-list__container">
        <FriendListContent />
      </div>
    </>
  );
};

export default FriendListContainer;
