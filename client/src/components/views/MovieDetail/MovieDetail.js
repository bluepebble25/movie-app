import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, BASE_IMAGE_URL } from '../../../config/Config';
import MainImage from '../commons/MainImage';
import MovieInfo from './Section/MovieInfo';

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
    fetch(endpointInfo)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMovie(data);
      });
  }, [movieId]);

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${BASE_IMAGE_URL}w1280${Movie.backdrop_path}`}
        title={`${Movie.title}`}
        text={`${Movie.overview}`}
      />
      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        {/* Movie Info */}
        <MovieInfo movie={Movie}/>
        <br />
        {/* Actors Info */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <button>Toggle Actor View</button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail