import logo from './logo.svg';
import './public/stylesheets/App.css';
import { useState, useEffect} from "react"
import Puzzle0 from './components/Puzzle0.js'
import crypto from "crypto-js";

function PuzzleButton(props) {
    const [solved, setSolved] = useState(false)
    console.log(props.hash)
    console.log(props.expectedHash)
    console.log(props.hash === props.expectedHash)
    useEffect(() => {
      if (props.hash === props.expectedHash)
        setSolved(true)
    })
    return (
        <>
          { (solved) ?
            <button className='completed_puzzle'>
              Puzzle {props.index}
            </button>
            :
            <button className='incomplete_puzzle'>
              Puzzle {props.index}
            </button>
          }
        </>
    )
}

function App() {
  const expectedHashes = [
      '6f4fd6b745d74e599e2a2862636293f4debbd0eac0975c61d6f9f69812f277c43cd8bba95a2535b0b856ba1b72507ca641634d075053d5ab5b6ae009aff6f0f6',
      '6f4fd6b745d74e599e2a2862636293f4debbd0eac0975c61d6f9f69812f277c43cd8bba95a2535b0b856ba1b72507ca641634d075053d5ab5b6ae009aff6f0f6',
      '6f4fd6b745d74e599e2a2862636293f4debbd0eac0975c61d6f9f69812f277c43cd8bba95a2535b0b856ba1b72507ca641634d075053d5ab5b6ae009aff6f0f6',
      '6f4fd6b745d74e599e2a2862636293f4debbd0eac0975c61d6f9f69812f277c43cd8bba95a2535b0b856ba1b72507ca641634d075053d5ab5b6ae009aff6f0f6',
      '6f4fd6b745d74e599e2a2862636293f4debbd0eac0975c61d6f9f69812f277c43cd8bba95a2535b0b856ba1b72507ca641634d075053d5ab5b6ae009aff6f0f6',
  ]

  const num_puzzles = 5;
  const [ puzzleState, setPuzzleState ] = useState(Array.from({length: num_puzzles}, (v, i) => i))
  console.log(puzzleState)

  function updateHash(puzzleIndex, plain_text) {
      console.log(plain_text)
      let newPuzzleState = [...puzzleState]
      let newHash = crypto.SHA512(plain_text).toString()
      newPuzzleState[puzzleIndex] = newHash
      setPuzzleState(newPuzzleState)
      console.log(newPuzzleState)
  }
  return (
    <div className="container">
      <div className="navbar">
        <PuzzleButton hash={puzzleState[0]} expectedHash={expectedHashes[0]} index={0}/>
      </div>
      <div className="puzzle_container">
        <Puzzle0 updatePuzzleHash={(plain_text) => updateHash(0, plain_text)}/>
      </div>
    </div>
  );
}

export default App;
