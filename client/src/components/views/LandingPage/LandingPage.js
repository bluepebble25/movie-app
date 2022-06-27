import React, { useEffect } from 'react';
import { API_URL, API_KEY } from '../../../config/Config';

function LandingPage() {

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => console.log(data));
    }, []);

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Gride Cards */}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
