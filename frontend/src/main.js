import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home';
import './styles.css';

ReactDOM.render(
    <React.StrictMode>
        <Home />
    </React.StrictMode>,
    document.getElementById('content')
);