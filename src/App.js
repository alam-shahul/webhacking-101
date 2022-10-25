import './public/stylesheets/App.css';
import { useState, useEffect} from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home.js'
import Puzzle0 from './components/Puzzle0.js'
import Puzzle1 from './components/Puzzle1.js'
import Puzzle2 from './components/Puzzle2.js'
import Puzzle3 from './components/SearchBarPuzzle.js'
import Puzzle4 from './components/Puzzle4.js'
import Puzzle5 from './components/Puzzle5.js'
import crypto from "crypto-js";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { StyledEngineProvider } from '@mui/material/styles';

function PuzzleButton(props) {
    const [unlocked, setUnlocked] = useState(false)
    const [solved, setSolved] = useState(false)

    useEffect(() => {
      if (props.hashes[props.index] === props.expectedHashes[props.index])
        setSolved(true)
      if (props.hashes[props.index - 1] === props.expectedHashes[props.index - 1] || props.index === 0)
        setUnlocked(true)
    })
    return (
        <>
          { !(unlocked) ?
            <ListItemButton disabled className="locked_puzzle">
              Puzzle {props.index}
            </ListItemButton>
			:
            <>
			{(solved) ?
			<Link to={"/puzzle" + `${props.index}`}>
			  <ListItemButton className='completed_puzzle'>
                Puzzle {props.index}
              </ListItemButton>
			</Link>
			 :
			<Link to={"/puzzle" + `${props.index}`}>
			  <ListItemButton className='incomplete_puzzle'>
                Puzzle {props.index}
              </ListItemButton>
			</Link>
			}
			</>
          }
        </>
    )
}

function App() {
  const expectedHashes = [
      '6f4fd6b745d74e599e2a2862636293f4debbd0eac0975c61d6f9f69812f277c43cd8bba95a2535b0b856ba1b72507ca641634d075053d5ab5b6ae009aff6f0f6',
      'dc1faa3599839920ca5b897265d37acfd93d5e32ebcbb65c468d60ac79003ffacc4b95350fa39501b8eee31619ef37144e6cdf575070db3dae437cca58275d6a',
      '2fe9de7d85da5ebba405ecfd4ee543ddaaa3a9a70eeec2143e90b4e5ae7c960320491a1b3199134854a5274cf5cadea19bc73ed980fb9fe5e0ed705035c68230',
      '77305c572ff69e4795a81531a53a9fc99d3fc9ce0ee181517c980ba37d584c0cfa9a6554008d81008a44cd62851a6ecec570b8b83c5c7adb1b2fbb8a72b028b7',
      '088a2fc4d66af286eb6929c8869a3350cfc62de58ff45d16275c6f98e84a005af70edd933c4bcced65bdc66271ef24a4146f6e219ff52e20844f4209555d83a9',
      '62902fa7d52fc9e6b5c9af5fdfe4086bbcb78c15bdeb572ee9da3ed490e683ac7d39ef607ec0207550de97313823bb41c7d78aa903fdc623c3bf01b54aa82bd1'
  ]

  const num_puzzles = 5;
  const [ puzzleState, setPuzzleState ] = useState(Array.from({length: num_puzzles}, (v, i) => i))

  function updateHash(puzzleIndex, plain_text) {
      let newPuzzleState = [...puzzleState]
      let newHash = crypto.SHA512(plain_text).toString()
      newPuzzleState[puzzleIndex] = newHash
      setPuzzleState(newPuzzleState)
      console.log(newPuzzleState)
  }
  const drawerWidth = "140px"

  return (
    <BrowserRouter basename="/webhacking-101">
      <StyledEngineProvider injectFirst>
        <div className="container">
          <div className="navbar">
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <List>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={0}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={1}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={2}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={3}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={4}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={5}/>
              </List>
            </Drawer>
          </div>
          <div className="puzzle_container">
	        <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/puzzle0" element={<Puzzle0 updatePuzzleHash={(plain_text) => updateHash(0, plain_text)} unlocked={true}/>}/>
              <Route exact path="/puzzle1" element={<Puzzle1 updatePuzzleHash={(plain_text) => updateHash(1, plain_text)} unlocked={puzzleState[0] === expectedHashes[0]}/>}/>
              <Route exact path="/puzzle2" element={<Puzzle2 updatePuzzleHash={(plain_text) => updateHash(2, plain_text)} unlocked={puzzleState[1] === expectedHashes[1]}/>}/>
              <Route exact path="/puzzle3" element={<Puzzle3 updatePuzzleHash={(plain_text) => updateHash(3, plain_text)} unlocked={puzzleState[2] === expectedHashes[2]}/>}/>
              <Route exact path="/puzzle4" element={<Puzzle4 updatePuzzleHash={(plain_text) => updateHash(4, plain_text)} unlocked={puzzleState[3] === expectedHashes[3]}/>}/>
              <Route exact path="/puzzle5" element={<Puzzle5 updatePuzzleHash={(plain_text) => updateHash(5, plain_text)} unlocked={puzzleState[4] === expectedHashes[4]}/>}/>
            </Routes>
          </div>
        </div>
      </StyledEngineProvider>
	</BrowserRouter>
  );
}

export default App;
