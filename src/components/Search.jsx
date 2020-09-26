import React, { useContext } from "react";
import "../styles/search.scss";
import { AppContext } from "../context/AppContext";

function Search() {
  const { onSearchChange } = useContext(AppContext);

  return (
    <div className="searchBar">
      <div className="searchIcon"></div>
      <input
        type="search"
        placeholder="Search..."
        results="5"
        onChange={onSearchChange}
        defaultValue={localStorage.getItem("query")}
      />
    </div>
  );
}

export default Search;
