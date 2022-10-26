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
import Puzzle6 from './components/Puzzle6.js'
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
      'b9be66708a23b3a5560ab5c667da0f5f7d560e0be420c9294b63bd04290ecedb03be183d10657dd11027777779395570dd95f813632cae347382148fe137aae2',
      'c5e88d865bdd8e8ca19846bd96ea1b66d6dadd2b20b24dc7180df723c6804fe985176d3628d3b0e2919b79eab8b6475c713c54bb4c977e6146272d27391f3e52',
      'b04dc7d0c5f94ad94f959397660f51bdc7b73dd736d3aa3feac8f205bca4a793df74d5df156e5915a58e73eacec1d034e616680d2b8cc939276badcaa28fd39e'
  ]

  const num_puzzles = 7;
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
			    <Link to={"/"}>
			      <ListItemButton>
                    Home
                  </ListItemButton>
			    </Link>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={0}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={1}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={2}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={3}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={4}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={5}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} index={6}/>
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
              <Route exact path="/puzzle6" element={<Puzzle6 updatePuzzleHash={(plain_text) => updateHash(6, plain_text)} unlocked={puzzleState[5] === expectedHashes[5]}/>}/>
            </Routes>
          </div>
        </div>
      </StyledEngineProvider>
	</BrowserRouter>
  );
}

export default App;
