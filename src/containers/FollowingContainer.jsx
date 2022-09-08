import React from "react";
import { useSelector } from "react-redux";
import { Following } from "../components";

function FollowingContainer() {
  const followList = useSelector((state) => state.followList.data);

  return <Following followList={followList} />;
}

export default FollowingContainer;
