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
        
        <div className="container px-5 py-24 mx-auto border flex flex-wrap">
            <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-12">
                Things to Do in {defaultCity.name}
            </h2>
            </div>
            <div className="container  mx-auto flex flex-wrap px-6 py-20">
            <PhotoDisplay query={defaultCity.name} />
            <div className="flex flex-col gap-6 rounded-full relative">
                {recommendations.length > 0 ? (
                    recommendations.slice(0, 4).map((poi) => (
                        <div key={poi.id} className="flex p-4 border flex-col align-center shadow">
                            <h3 className="font-semibold sm:text-2xl text-xl justify-center">{poi.name}</h3>
                            <p className="text-sm text-black-600 mt-1">{poi.category}</p>
                            {poi.Description && (
                                <p className="text-xs mt-2 text-black-600 inline-flex items-center">{poi.shortDescription}</p>
                            )}
                            {poi.price && (
                                <p className="text-xs mt-2 text-black-600 inline-flex items-center">Price: {poi.price.amount} {poi.price.currency}</p>
                            )}
                             {poi.tags && (
                            <p className="text-xs mt-2 text-black-600 inline-flex items-center">Tags: {poi.tags.join(', ')}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-black-600 inline-flex items-center col-span-full">No recommendations found for this city.</p>
                )}
            </div>
            </div>
        </div>
        
    );
}

export default Recommendations;