import React, { useEffect, useState } from "react";
import { connect } from "getstream";
import Cookies from "universal-cookie";
import {
  FollowButton,
  useFeedContext,
  useStreamContext,
} from "react-activity-feed";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header"></div>
      {children}
    </div>
  );
};

const FriendSearchList = ({ user }) => {
  const cookies = new Cookies();

  const apiKey = "adazxgkkh3hb";
  const authToken = cookies.get("token");
  const userId = cookies.get("userId");

  const appId = "1201640";

  const { client } = useStreamContext();
  // const feed = useFeedContext();

  // const client = connect(apiKey, authToken, appId);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  const followClick = async () => {
    if (!user) {
      return;
    }

    try {
      client.reactions.add(
        "follow",
        userId,
        {},
        { targetFeeds: [`notification:${users}`] }
      );

      const myFeed = client.feed("user", userId);
      myFeed.follow("user", users);

      await myFeed.following({ filter: [`user:${users}`] });

      window.location.reload();
    } catch (err) {}
  };

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.user(user).get();
        if (response.full.id.length) {
          setUsers(user);
          setName(response.data.name);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No users found.</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users...</div>
      ) : (
        <>
          <p className="user-list__message">{name}</p>
          <FollowButton onClick={followClick}>follow</FollowButton>
        </>
      )}
    </ListContainer>
  );
};

export default FriendSearchList;
