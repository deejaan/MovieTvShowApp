import React, { useState, useMemo, useCallback } from "react";
import NavBar from "../components/NavBar";
import Movies from "../components/Movies";
import TvShows from "../components/TvShows";
import Details from "../components/Details";
import { AppContext } from "../context/AppContext";
import "../styles/home.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function Home() {
  let currentActive = "tvshows";
  if (window.location.pathname.includes("movies")) currentActive = "movies";

  const [activeTab, setActiveTab] = useState(currentActive);
  const [selectedItemType, setSelectedItemType] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  const onSearchChange = useCallback((event) => {
    let value = event.target.value;
    setTimeout(() => {
      setSearchQuery(value);
    }, 1000);
  }, []);

  const contextValues = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      selectedItemType,
      setSelectedItemType,
      searchItems,
      setSearchItems,
      searchQuery,
      setSearchQuery,
      onSearchChange,
    }),
    [
      activeTab,
      setActiveTab,
      selectedItemType,
      setSelectedItemType,
      searchItems,
      setSearchItems,
      searchQuery,
      setSearchQuery,
      onSearchChange,
    ]
  );

  return (
    <Router>
      <AppContext.Provider value={contextValues}>
        <div className="homeLayout">
          <NavBar></NavBar>
          <Switch>
            <Route path="/movies" exact component={Movies}></Route>
            <Route path="/tvshows" exact component={TvShows}></Route>
            <Route path="/movies/details/:id" exact component={Details}></Route>
            <Route
              path="/tvshows/details/:id"
              exact
              component={Details}
            ></Route>
            <Redirect from="/" to="/tvshows" exact />
          </Switch>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default Home;
