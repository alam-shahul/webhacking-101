import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../public/stylesheets/puzzle_2.css';
import Draggable from 'react-draggable';
import goldfish from '../public/images/goldfish.png'
import fishbowl from '../public/images/fishbowl.png'

function Puzzle2(props) {
  const navigate = useNavigate()
  const [deltaX, setDeltaX] = useState(0);
  useEffect(() =>
    {
      if (! props.unlocked)
        navigate("/")
    }
  )
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.address.value);
    console.log(e.target.state.value);
    console.log(e.target.zipcode.value);

    let result = {
      "name": e.target.name.value,
      "address": e.target.address.value,
      "state": e.target.state.value,
      "zipcode": e.target.zipcode.value,
    }
    props.updatePuzzleHash(JSON.stringify(result))
  }

  const handleDrag = (e, ui) => {
    setDeltaX(deltaX + ui.deltaX)
	let result = {
      "deltaX": deltaX
    }
    props.updatePuzzleHash(JSON.stringify(result))
  };
  return (
    <>
      <div className="puzzle">
        <div className="puzzle_title">
          <div className="puzzle_header">
          Puzzle 2
          </div>
          Drag the fish into the fishbowl!
        </div>
        <br/>
        <div className="puzzle_2">
          <div className="fishbowl_container">
            <Draggable onDrag={handleDrag} bounds={{top: 0, left: 0, right: 235, bottom: 0}} >
              <img className="goldfish" src={goldfish} draggable="false"/>
            </Draggable>
            <img className="fishbowl" src={fishbowl} draggable="false"/>
          </div>
          <div className="glass_cover"></div>
        </div>
      </div>
    </>
  );
}

export default Puzzle2;
