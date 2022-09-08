import React from "react";
import FriendSearchList from "./FriendSearchList";

const ResultsDropdown = ({ query, loading }) => {
  return (
    <div className="channel-search__results">
      <p className="channel-search__results-header">Users</p>
      {loading && !query.length && (
        <p className="channel-search__results-header">
          <i>Loading...</i>
        </p>
      )}
      {!loading && !query.length ? (
        <p className="channel-search__res ults-header">
          <i>No direct messages found</i>
        </p>
      ) : (
        query && <FriendSearchList user={query} />
      )}
    </div>
  );
};

export default ResultsDropdown;
