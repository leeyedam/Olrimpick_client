import React from "react";
import { useSelector } from "react-redux";
import { AlertFeed } from "../components";

function AlertFeedContainer() {
  const followList = useSelector((state) => state.followList.data);

  return <AlertFeed followList={followList} />;
}

export default AlertFeedContainer;
