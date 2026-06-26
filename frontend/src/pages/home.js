import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        const container = document.getElementById('home-template');
        if (container) {
            fetch('/home.html')
                .then((response) => response.text())
                .then((html) => {
                    container.innerHTML = html;
                })
                .catch((error) => {
                    console.error('Unable to load home template:', error);
                });
        }
    }, []);

    return <div id="home-template" />;
};

export default Home;