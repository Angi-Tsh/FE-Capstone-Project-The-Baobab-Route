import React, { useEffect, useState } from "react";

function PhotoDisplay({ query }) {
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false); // Initialize loading to false
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    // Corrected function declaration syntax
    const fetchPhoto = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch photo from Unsplash.');
        }
        const data = await response.json();
        // Check if results exist before setting the image URL
        if (data.results.length > 0) {
          setImageURL(data.results[0].urls.small);
        } else {
          setImageURL(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [query]); // Re-run effect when the query changes

  if (loading) return <p>Loading image...</p>;
  if (error) return <p>Error loading image.</p>;
  if (!imageURL) return <p>No image found.</p>;

  return (
    <img className="w-16 md:w-32 lg:w-32 rounded mx-auto"
      src={imageURL}
      alt={`Image of ${query}`}
    />
  );
}

export default PhotoDisplay;