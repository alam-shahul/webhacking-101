import { useState, useEffect, useRef } from 'react';
import '../public/stylesheets/puzzle_0.css';
import { Crossword, ThemeProvider }from '@jaredreisinger/react-crossword';

function Puzzle1(props) {
  const crosswordRef = useRef(null);
  const data = {
      across: {
        1: {
          clue: '___ Alley',
          answer: 'TORNADO',
          row: 0,
          col: 0
        },
        2: {
          clue: 'Asian downpour',
          answer: 'MONSOON',
          row: 2,
          col: 0
        },
        3: {
          clue: 'Run, ____, run!',
          answer: 'FOREST',
          row: 6,
          col: 0
        },
      },
      down: {
        2: {
          clue: 'Californian climate, most of the time',
          answer: 'DROUGHT',
          row: 0,
          col: 5
        },
      }
  };
  const theme = {
    columnBreakpoint: "200px",
  };

  function onCrosswordCorrect(isCorrect) {
    console.log(isCorrect)
    props.updatePuzzleHash(JSON.stringify({...data, solved: isCorrect}))
    crosswordRef.current.focus()
    crosswordRef.current.reset()
  }
  return (
    <div className="puzzle">
      <div className="puzzle_title">
        <div className="puzzle_header">
        Puzzle 0
        </div>
        Solve the crossword!
      </div>
      <div className="puzzle_0">
        <div className="crossword_container">
          <ThemeProvider theme={theme}>
            <Crossword ref={crosswordRef} data={data} onCrosswordCorrect={onCrosswordCorrect}/>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default Puzzle1;
