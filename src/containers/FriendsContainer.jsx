import React from "react";
import { useSelector } from "react-redux";
import { Friends } from "../components";

function FriendsContainer({ userId }) {
  const followerList = useSelector((state) => state.followerList.data);
  const followList = useSelector((state) => state.followList.data);

  return (
    <Friends
      followerList={followerList}
      followList={followList}
      userId={userId}
    />
  );
}

export default FriendsContainer;
