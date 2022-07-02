import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.movieTitle;
  const moviePoster = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePoster,
    movieRunTime
  };

  useEffect(() => {
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
  }, []);
  
  const onClickFavorite = () => {
    if(Favorited) {
      axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
          if(response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert('Favorite 리스트에서 지우는 것을 실패했습니다.');
          }
        });
    } else {
      axios.post('/api/favorite/addToFavorite', variables)
        .then(response => {
          if(response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          } else {
            alert('Favorite 리스트에 추가하는 것을 실패했습니다.');
          }
        });
    }
  };

  return (
    <Button onClick={onClickFavorite}>{ Favorited ? "Not Favorite" : "Add to Favorite" } {FavoriteNumber}</Button>
  )
}

export default Favorite