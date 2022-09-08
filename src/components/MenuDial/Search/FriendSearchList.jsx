import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import useFeedClient from "../../../hooks/useFeedClient";
import useFollowing from "../../../hooks/useFollowing";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header"></div>
      {children}
    </div>
  );
};

const FriendSearchList = ({ user }) => {
  const client = useFeedClient();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);
  const followClick = useFollowing;

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p className="user-list__message">{name}</p>
          <p style={{ color: "#d7d7d7" }}> | </p>
          <Button
            onClick={() => followClick(users)}
            sx={{
              width: "160px",
              border: "1px solid #fff",
              borderRadius: "20px",
              color: "#fff",
              ml: "30px",
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            follow
          </Button>
        </div>
      )}
    </ListContainer>
  );
};

export default FriendSearchList;
