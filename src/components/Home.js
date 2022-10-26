import { useState, useEffect, useRef } from 'react';
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
        <ListItem sx={{ display: 'list-item' }}>This is a <span className="bold">C</span>apture <span className="bold">T</span>he <span className="bold">F</span>lag! Your goal is to hack through all the puzzles as fast as possible.</ListItem>
        <ListItem sx={{ display: 'list-item' }}>If you're stuck on a puzzle, ask for a hint! Don't worry, we'll try to not completely give the solution away.</ListItem>
        <ListItem sx={{ display: 'list-item' }}>If you complete a puzzle, the corresponding button text on the sidebar will be styled as <span className="completed_puzzle">green strikethrough.</span></ListItem>
        <ListItem sx={{ display: 'list-item' }}>You can see the time that you've spent on each puzzle below:
		{ props.timesElapsed.map((timeElapsed, index) => 
		  <>
			<br/>
			<br/>
		    <div className="timer">Puzzle {index}: {timeElapsed}</div>
		  </>
		  )
		}
		<br/>
		<br/>
		<div className="timer">Total time: {
		  props.timesElapsed.reduce(
		    (previousValue, currentValue) => previousValue + currentValue,
		    0
		  )}
		</div>
		</ListItem>
        <div className="crossword_container">
        </div>
      </div>
    </div>
  );
}

export default Home;
