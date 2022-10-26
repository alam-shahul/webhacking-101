import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../public/stylesheets/puzzle_7.css';

function Puzzle7(props) {
  const passwordRef = useRef(null);
  const navigate = useNavigate()
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
  return (
    <div className="puzzle">
      <div className="puzzle_title">
        <div className="puzzle_header">
        Puzzle 6
        </div>
        Intercept the package!
      </div>
      <div className="puzzle_description">The president is receiving an important package via Amazon delivery, but we would like to receive it here at CMU <span className="monospace">(5000 Forbes Ave, Pittsburgh, PA 15213)</span>...</div>
      <br/>
      <div className="puzzle_6">
        <div className="form_container">
          <br/>
        </div>
      </div>
    </div>
  );
}

export default Puzzle6;

