import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShortenUrlPage = () => {
    const { url } = useParams();

    useEffect(() => {
        if (url) {
            const redirectBase = import.meta.env.VITE_REDIRECT_BASE || import.meta.env.VITE_BACKEND_URL;
            window.location.href = `${redirectBase}/s/${url}`;
        }
    }, [url]);

    return <p>Redirecting...</p>;
};

export default ShortenUrlPage;
