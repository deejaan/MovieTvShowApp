import React, { useState, useEffect, useContext } from "react";
import "../styles/details.scss";
import { AppContext } from "../context/AppContext";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

function Details({ match }) {
  const [details, setDetails] = useState({});
  const [trailer, setTrailer] = useState();
  const { activeTab } = useContext(AppContext);
  const id = match.params.id;
  const history = useHistory();

  useEffect(() => {
    const fetchDetails = async () => {
      if (activeTab === "movies") {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            id +
            "?api_key=f947a44d2a6e4d83597caac31844a6f7"
        );
        const details = await data.json();
        setDetails(details);

        //dobavljanje youtube linka za trailer
        const dataVideos = await fetch(
          "http://api.themoviedb.org/3/movie/" +
            id +
            "/videos?api_key=f947a44d2a6e4d83597caac31844a6f7"
        );
        const videosJSON = await dataVideos.json();
        const videos = videosJSON.results;
        const trailerVideo = videos.find((video) => {
          return video.type === "Trailer";
        });
        if (trailerVideo) {
          const youtubeLink =
            "https://www.youtube.com/watch?v=" + trailerVideo.key;
          setTrailer(youtubeLink);
        }
      }

      if (activeTab === "tvshows") {
        const data = await fetch(
          "https://api.themoviedb.org/3/tv/" +
            id +
            "?api_key=f947a44d2a6e4d83597caac31844a6f7"
        );
        const details = await data.json();
        setDetails(details);

        //dobavljanje youtube linka za trailer
        const dataVideos = await fetch(
          "http://api.themoviedb.org/3/tv/" +
            id +
            "/videos?api_key=f947a44d2a6e4d83597caac31844a6f7"
        );
        const videosJSON = await dataVideos.json();
        const videos = videosJSON.results;
        const trailerVideo = videos.find((video) => {
          return video.type === "Trailer";
        });
        if (trailerVideo) {
          const youtubeLink =
            "https://www.youtube.com/watch?v=" + trailerVideo.key;
          setTrailer(youtubeLink);
        }
      }
    };
    fetchDetails();
  }, [id, activeTab]);

  const poster = "https://image.tmdb.org/t/p/w200" + details.poster_path;
  let releaseDate;
  if (activeTab === "movies") releaseDate = details.release_date;
  else if (activeTab === "tvshows") releaseDate = details.first_air_date;

  return (
    <div className="detailsContainer">
      <div
        className="backBtn"
        onClick={() => {
          history.goBack();
        }}
      >
        <div className="backIcon"></div> <h4>Back</h4>
      </div>
      {
        //Koristeci ternari operator provjeravamo da li postoji trailer za dati film.
        //Ako postoji renderamo video, u suprotnom renderamo cover sliku.
        trailer ? (
          <ReactPlayer url={trailer} />
        ) : (
          <img src={poster} alt=""></img>
        )
      }
      <h2>{details.title}</h2>
      <h4>Rating: {details.vote_average}</h4>
      <h4>Release Date: {releaseDate}</h4>
      <h4>Overview:</h4>
      <p>{details.overview}</p>
    </div>
  );
}

export default Details;
