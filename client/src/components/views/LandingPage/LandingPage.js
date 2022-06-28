import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, BASE_IMAGE_URL } from '../../../config/Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                setMovies(data.results);
                setMainMovieImage(data.results[0]);
            });
    }, []);

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Main Image */}
            {MainMovieImage &&
                <MainImage
                image={`${BASE_IMAGE_URL}w1280${MainMovieImage.backdrop_path}`}
                title={`${MainMovieImage.title}`}
                text={`${MainMovieImage.overview}`}
            />}

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Gride Cards */}
                <Row gutter={[16, 16]} >
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={movie.poster_path ?
                                    `${BASE_IMAGE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
