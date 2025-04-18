import React from 'react';
import 'styles/layout.scss';

const Home = ({ onRequest }) => (
  <div className="home-page">
    <h1>A better way to enjoy every day.</h1>
    <p>Be the first to experience it!</p>
    <button onClick={onRequest}>Request an invite</button>
  </div>
);

export default Home;
