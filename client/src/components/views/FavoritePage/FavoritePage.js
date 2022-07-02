import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './favorite.css'

function FavoritePage() {

  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.post('/api/favorite/getFavoriteMovie', { userFrom: localStorage.getItem('userId') })
      .then(response => {
        if(response.data.success) {
          setFavorites(response.data.favorites);
        } else {
          alert('영화 정보를 가져오는데 실패했습니다.');
        }
      })
  }, []);

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movies</h2>
      <table>
        <thead>
          <tr>
            <td>Movie Title</td>
            <td>Movie RunTime</td>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>
          {Favorites.map((favorite, index) => (
            <tr key={index}>
              <td>{favorite.movieTitle}</td>
              <td>{favorite.movieRunTime}</td>
              <td><button>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage