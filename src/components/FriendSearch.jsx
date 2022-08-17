import React, { useState } from "react";

import { ResultsDropdown } from ".";
import { SearchIcon } from "../assets";

const FriendSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const onSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    setQuery(event.target.value);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-serach__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
          style={{ width: "100vw" }}
        />
      </div>
      {query && (
        <ResultsDropdown loading={loading} query={query} setQuery={setQuery} />
      )}
    </div>
  );
};

export default FriendSearch;
