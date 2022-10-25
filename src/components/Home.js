import { useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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
        <ListItem sx={{ display: 'list-item' }}>Hello</ListItem>
        <div className="crossword_container">
        </div>
      </div>
    </div>
  );
}

export default Home;
