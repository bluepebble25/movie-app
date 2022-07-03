import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './favorite.css'
import {Popover} from 'antd'
import {BASE_IMAGE_URL} from '../../../config/Config'

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

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
    <div>
      {favorite.moviePost ?
        <img src={`${BASE_IMAGE_URL}w500${favorite.moviePost}`} alt={`${favorite.moviePost}`} /> : "no image"
      }
    </div>
    )

    return (
      <tr key={index}>
        <td><Popover content={content} title={`${favorite.movieTitle}`}>{favorite.movieTitle}</Popover></td>
        <td>{favorite.movieRunTime}</td>
        <td><button>Remove</button></td>
      </tr>
    )
  });

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
          {renderCards}
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage