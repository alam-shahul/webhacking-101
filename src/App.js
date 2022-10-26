import './public/stylesheets/App.css';
import { useState, useEffect} from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactCanvasConfetti from "react-canvas-confetti";

import RealisticConfetti from './components/Confetti.js'
import Home from './components/Home.js'
import Puzzle0 from './components/Puzzle0.js'
import Puzzle1 from './components/Puzzle1.js'
import Puzzle2 from './components/Puzzle2.js'
import Puzzle3 from './components/Puzzle3.js'
import Puzzle4 from './components/Puzzle4.js'
import Puzzle5 from './components/Puzzle5.js'
import Puzzle6 from './components/Puzzle6.js'
import Puzzle7 from './components/Puzzle7.js'
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
            <ListItemButton disabled onClick={props.onClick} className="locked_puzzle">
              Puzzle {props.index}
            </ListItemButton>
			:
            <>
			{(solved) ?
			<Link to={"/puzzle" + `${props.index}`}>
			  <ListItemButton onClick={props.onClick} className='completed_puzzle'>
                Puzzle {props.index}
              </ListItemButton>
			</Link>
			 :
			<Link to={"/puzzle" + `${props.index}`}>
			  <ListItemButton onClick={props.onClick} className='incomplete_puzzle'>
                Puzzle {props.index}
              </ListItemButton>
			</Link>
			}
			</>
          }
        </>
    )
}

function Timer(props) {
  const [ timesElapsed, setTimesElapsed] = useState(JSON.parse(window.localStorage.getItem('timesElapsed')) || Array(props.num_puzzles).fill(0))

  
  useEffect(() => {
    window.localStorage.setItem('timesElapsed', JSON.stringify(timesElapsed));
  }, [timesElapsed]);
  
  function updateTimeElapsed(puzzleIndex, timeElapsed) {
      let newTimesElapsed = [...timesElapsed]
      newTimesElapsed[puzzleIndex] = timeElapsed
	  setTimesElapsed(newTimesElapsed);
  }

  useEffect(() => {
    if (props.activePuzzle !== null && props.expectedHashes[props.activePuzzle] !== props.puzzleState[props.activePuzzle])  {
      const id = setInterval(() => updateTimeElapsed(props.activePuzzle, timesElapsed[props.activePuzzle] + 1), 1000);
      return () => {
        clearInterval(id);
      };
	}
  });

  return (
	  (props.activePuzzle !== null) ? 
	    <div className="timer top_right">Time elapsed: {timesElapsed[props.activePuzzle]}</div>
		:
		<></>
  )
}

function App() {
  const expectedHashes = [
      'e0da8509fe7dcb24ceab45070d532ac26cddeb1e195d6c8ec58f3e50e561ca9358d5c52505c8264d085825f77397152ef48ccc30c0d16d46101947a76477f778',
      'dc1faa3599839920ca5b897265d37acfd93d5e32ebcbb65c468d60ac79003ffacc4b95350fa39501b8eee31619ef37144e6cdf575070db3dae437cca58275d6a',
      'bb7f99ae8cda47be8611456bb9a239060e69300b469767b39b00fca52f30c15d61b2cc7dbffde5c9118064f772ace6bdc3c31de80f5c3a3cbfb19e1a16ecb6ce',
      '2fe9de7d85da5ebba405ecfd4ee543ddaaa3a9a70eeec2143e90b4e5ae7c960320491a1b3199134854a5274cf5cadea19bc73ed980fb9fe5e0ed705035c68230',
      '77305c572ff69e4795a81531a53a9fc99d3fc9ce0ee181517c980ba37d584c0cfa9a6554008d81008a44cd62851a6ecec570b8b83c5c7adb1b2fbb8a72b028b7',
      '11b5d0babdebb4916fdaadd99c463bece409771bfd8b84d4f39d3e4539582c013d0d300b08f51822d7e2b435079343b23405dc7cc1f1fdf4583c40ece71ec59d',
      'c5e88d865bdd8e8ca19846bd96ea1b66d6dadd2b20b24dc7180df723c6804fe985176d3628d3b0e2919b79eab8b6475c713c54bb4c977e6146272d27391f3e52',
      'b9be66708a23b3a5560ab5c667da0f5f7d560e0be420c9294b63bd04290ecedb03be183d10657dd11027777779395570dd95f813632cae347382148fe137aae2',
  ]

  const num_puzzles = 8;
  const [ puzzleState, setPuzzleState ] = useState(JSON.parse(window.localStorage.getItem('puzzleState')) || Array.from({length: num_puzzles}, (v, i) => i))
  const [ timesElapsed, setTimesElapsed] = useState(JSON.parse(window.localStorage.getItem('timesElapsed')) || Array(num_puzzles).fill(0))
  const [ confettiCount, setConfettiCount ] = useState(0);
  const [ activePuzzle, setActivePuzzle] = useState(null);

  function updateHash(puzzleIndex, plain_text) {
      if (expectedHashes[puzzleIndex] === puzzleState[puzzleIndex])
        return

      let newPuzzleState = [...puzzleState]
      let newHash = crypto.SHA512(plain_text).toString()
      
      newPuzzleState[puzzleIndex] = newHash

      if (newHash === expectedHashes[puzzleIndex])
        setConfettiCount(confettiCount + 1)

      setPuzzleState(newPuzzleState)
      window.localStorage.setItem('puzzleState', JSON.stringify(newPuzzleState))
      //console.log(newPuzzleState)
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
			      <ListItemButton onClick={() => { setActivePuzzle(null); setTimesElapsed(JSON.parse(window.localStorage.getItem('timesElapsed')));} }>
                    Home
                  </ListItemButton>
			    </Link>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} onClick={() => { setActivePuzzle(0)} } index={0}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} onClick={() => { setActivePuzzle(1)} } index={1}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} onClick={() => { setActivePuzzle(2)} } index={2}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} onClick={() => { setActivePuzzle(3)} } index={3}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} onClick={() => { setActivePuzzle(4)} } index={4}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} onClick={() => { setActivePuzzle(5)} } index={5}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} onClick={() => { setActivePuzzle(6)} } index={6}/>
                <PuzzleButton hashes={puzzleState} expectedHashes={expectedHashes} onClick={() => { setActivePuzzle(7)} } index={7}/>
			    { expectedHashes.every((element, index) => (element === puzzleState[index])) ?
				  <Link to={"/"}>
			        <ListItemButton onClick={() => { setActivePuzzle(null); setTimesElapsed(JSON.parse(window.localStorage.getItem('timesElapsed')));} }>
                     🎉🎉🎉
                    </ListItemButton>
			      </Link>
				  :
				  <></>
				}
              </List>
            </Drawer>
          </div>
          <div className="puzzle_container">
	        <Routes>
              <Route exact path="/" element={<Home timesElapsed={timesElapsed}/>}/>
              <Route exact path="/puzzle0" element={<Puzzle0 updatePuzzleHash={(plain_text) => updateHash(0, plain_text)} unlocked={true}/>}/>
              <Route exact path="/puzzle1" element={<Puzzle1 updatePuzzleHash={(plain_text) => updateHash(1, plain_text)} unlocked={puzzleState[0] === expectedHashes[0]}/>}/>
              <Route exact path="/puzzle2" element={<Puzzle2 updatePuzzleHash={(plain_text) => updateHash(2, plain_text)} unlocked={puzzleState[1] === expectedHashes[1]}/>}/>
              <Route exact path="/puzzle3" element={<Puzzle3 updatePuzzleHash={(plain_text) => updateHash(3, plain_text)} unlocked={puzzleState[2] === expectedHashes[2]}/>}/>
              <Route exact path="/puzzle4" element={<Puzzle4 updatePuzzleHash={(plain_text) => updateHash(4, plain_text)} unlocked={puzzleState[3] === expectedHashes[3]}/>}/>
              <Route exact path="/puzzle5" element={<Puzzle5 updatePuzzleHash={(plain_text) => updateHash(5, plain_text)} unlocked={puzzleState[4] === expectedHashes[4]}/>}/>
              <Route exact path="/puzzle6" element={<Puzzle6 updatePuzzleHash={(plain_text) => updateHash(6, plain_text)} unlocked={puzzleState[5] === expectedHashes[5]}/>}/>
              <Route exact path="/puzzle7" element={<Puzzle7 updatePuzzleHash={(plain_text) => updateHash(7, plain_text)} unlocked={puzzleState[6] === expectedHashes[6]}/>}/>
            </Routes>
          </div>
        </div>
      </StyledEngineProvider>
      <RealisticConfetti confettiCount={confettiCount} setConfettiCount={setConfettiCount}/>
	  <Timer activePuzzle={activePuzzle} num_puzzles={num_puzzles} expectedHashes={expectedHashes} puzzleState={puzzleState}/>
	</BrowserRouter>
  );
}

export default App;
