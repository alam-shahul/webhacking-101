import { useState, useEffect, useRef } from 'react';

function Home(props) {
  return (
    <div className="puzzle">
      <div className="puzzle_title">
        <div className="puzzle_header">
        Welcome to Webhacking 101!
        </div>
      </div>
      <div className="home-text">
        <div>Instructions:</div>
        <div className="crossword_container">
        </div>
      </div>
    </div>
  );
}

export default Home;
