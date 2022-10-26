import { useState, useEffect, useRef } from 'react';
import '../public/stylesheets/puzzle_0.css';
import { Crossword, ThemeProvider } from '@jaredreisinger/react-crossword';

function Puzzle0(props) {
  const crosswordRef = useRef(null);
  const data = {
      across: {
        1: {
          clue: '____-bellied (synonym for "cowardly")',
          answer: 'YELLOW',
          row: 0,
          col: 0
        },
        2: {
          clue: '♫____ sheep, ____ sheep,\nhave you any wool♫',
          answer: 'BLACK',
          row: 2,
          col: 2
        },
      },
      down: {
        1: {
          clue: 'You might find one in a tree',
          answer: 'ORANGE',
          row: 0,
          col: 4
        },
        2: {
          clue: '____-ie (something tasty)',
          answer: 'BROWN',
          row: 2,
          col: 2
        },
      }
  };
  const theme = {
    columnBreakpoint: "200px",
  };

  function onCrosswordCorrect(isCorrect) {
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
            <Crossword useStorage={false} ref={crosswordRef} data={data} onCrosswordCorrect={onCrosswordCorrect}/>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default Puzzle0;
