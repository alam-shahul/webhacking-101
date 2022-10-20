import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../public/stylesheets/puzzle_1.css';
import Game from './Game.js';

function Puzzle1(props) {
  const navigate = useNavigate()
  useEffect(() =>
    {
      if (! props.unlocked)
        navigate("/")
    }
  )
  return (
    <div className="puzzle">
      <div className="puzzle_title">
        <div className="puzzle_header">
        Puzzle 1
        </div>
        Solve the sudoku board!
      </div>
      <div className="puzzle_1">
        <div className="sudoku_container">
		  <Game updatePuzzleHash={props.updatePuzzleHash}/>
        </div>
      </div>
    </div>
  );
}

export default Puzzle1;
