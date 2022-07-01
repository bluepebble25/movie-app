import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, BASE_IMAGE_URL } from '../../../config/Config';
import MainImage from '../commons/MainImage';
import MovieInfo from './Section/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Section/Favorite';
import { Row } from 'antd';

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState("");
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
    const endpointCrews = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko`;

    fetch(endpointInfo)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
      });

    fetch(endpointCrews)
    .then(response => response.json())
    .then(data => {
      setCasts(data.cast);
    });
  }, [movieId]);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  }

  return (
    <div>
      {/* Header */}
      { Movie &&
        <MainImage
        image={`${BASE_IMAGE_URL}w1280${Movie.backdrop_path}`}
        title={`${Movie.title}`}
        text={`${Movie.overview}`}
      />}

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
        </div>

        {/* Movie Info */}

        <MovieInfo movie={Movie}/>
        <br />

        {/* Actors Info */}

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>

        {ActorToggle &&
        <Row gutter={[16, 16]} >
          {Casts && Casts.map((cast, index) => (
            <React.Fragment key={index}>
              <GridCards
                image={cast.profile_path ?
                  `${BASE_IMAGE_URL}w500${cast.profile_path}` : null}
                castName={cast.name}
              />
            </React.Fragment>
          ))}
        </Row>
        }
        
      </div>
    </div>
  )
}

export default MovieDetail