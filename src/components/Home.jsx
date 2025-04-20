import React from 'react';
import 'styles/home.scss';

const Home = ({ onRequest }) => (
  <div className="home-page">
    <h1>A better way</h1>
    <h1>to enjoy every day.</h1>
    <p>Be the first to experience it!</p>
    <button onClick={onRequest}>Request an invite</button>
  </div>
);

export default Home;
