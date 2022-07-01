import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Favorite(props) {

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.movieTitle;
  const moviePoster = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    let variables = {
      userFrom,
      movieId
    };
    // console.log(variables);
    axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        if(response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert("'좋아요' 숫자를 가져오는데 실패했습니다.");
        }
      });
    
    axios.post('/api/favorite/favorited', variables)
    .then(response => {
      if(response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("'좋아요' 여부를 가져오는데 실패했습니다.");
      }
    });
  }, [movieId, userFrom]);
  

  return (
    <button>{ Favorited ? "Not Favorite" : "Add to Favorite" } {FavoriteNumber}</button>
  )
}

export default Favorite