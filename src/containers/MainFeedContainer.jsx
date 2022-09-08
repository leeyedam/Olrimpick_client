import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainFeed from "../components/MainFeed";
import { getFollowerThunk } from "../redux/modules/followerList";
import { getFollowThunk } from "../redux/modules/followList";

function MainFeedContainer() {
  const dispatch = useDispatch();
  const getFollower = useCallback(() => {
    dispatch(getFollowerThunk());
  }, [dispatch]);
  const getFollow = useCallback(() => {
    dispatch(getFollowThunk());
  }, [dispatch]);
  return <MainFeed getFollower={getFollower} getFollow={getFollow} />;
}

export default MainFeedContainer;
