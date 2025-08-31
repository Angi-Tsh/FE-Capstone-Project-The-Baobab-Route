import React, { useState, useEffect } from 'react';
import { getAccessToken } from '../services/auth';
import PhotoDisplay from '../assets/PhotoDisplay';

function Recommendations() {
    // State to hold the recommendations data
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Default city and its coordinates for the landing page
    const defaultCity = { name: 'Madrid, Spain', latitude: 40.414000, longitude: -3.691000 };

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            setError(null);
            try {
                const accessToken = await getAccessToken();

                if (!accessToken) {
                    throw new Error("Access token not available. Please check your authentication service.");
                }

                // Log the token to confirm it's being retrieved
                console.log('Access Token:', accessToken);

                // Fetch points of interest using the default city's coordinates
                const response = await fetch(
                    `/api/v1/shopping/activities?longitude=${defaultCity.longitude}&latitude=${defaultCity.latitude}&radius=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // Ensure this header is correctly formatted
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch recommendations. Status: " + response.status);
                }

                const data = await response.json();
                setRecommendations(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) return <p>Loading recommendations...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className='text-center mb-8'>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Things to Do in {defaultCity.name}
            </h2>
            <div className="grid grid-cols-2">
            <PhotoDisplay query={defaultCity.name} />
            <div className="grid grid-cols-2 container sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-full ">
                {recommendations.length > 0 ? (
                    recommendations.slice(0, 4).map((poi) => (
                        <div key={poi.id} className="p-4 border rounded shadow">
                            <h3 className="font-semibold text-lg">{poi.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{poi.category}</p>
                            {poi.shortDescription && (
                                <p className="text-xs mt-2 text-gray-600">{poi.shortDescription}</p>
                            )}
                            {poi.price && (
                                <p className="text-xs mt-2 text-purple-600">Price: {poi.price.amount} {poi.price.currency}</p>
                            )}
                             {poi.tags && (
                            <p className="text-xs mt-2 text-gray-600">Tags: {poi.tags.join(', ')}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No recommendations found for this city.</p>
                )}
            </div>
            </div>
        </div>
        </div>
    );
}

export default Recommendations;