import React from "react";
import { useSelector } from "react-redux";
import { Follower } from "../components";

function FollowerContainer() {
  const followerList = useSelector((state) => state.followerList.data);
  const followList = useSelector((state) => state.followList.data);

  return <Follower followerList={followerList} followList={followList} />;
}

export default FollowerContainer;
