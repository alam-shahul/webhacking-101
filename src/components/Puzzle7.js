import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../public/stylesheets/puzzle_7.css';
import cute_bunny from  '../cute_bunny.jpg';

function Puzzle4(props) {
  const reader = new FileReader();
  // reader.onloadend = () => {
  //   console.log(reader.result);
  // }
  // reader.readAsDataURL(cute_bunny);
  
  const [injectionString, setInjectionString] = useState("")
  const [executableCode, setExecutableCode] = useState("")
  const navigate = useNavigate()
  useEffect(() =>
    {
      if (! props.unlocked)
        navigate("/")
    }
  )
  useEffect(() =>
    {
      updateHash();
    }
  , [injectionString])

  function custom_eval(code) {
    try {
      new Function(code)(); 
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e.message);
      }
    }
  }

  function updateHash() {
    let injectable = document.getElementById("response_container");
    for (const child of injectable.childNodes) {
        if (child.nodeName == "IMG" && child.src.includes(cute_bunny)) {
          props.updatePuzzleHash(JSON.stringify({
            "nodeName": child.nodeName,
            "srcMatch": child.src.includes(cute_bunny)
          }))
        }
    }
  }

  return (
    <div className="puzzle">
      <div className="puzzle_title">
        <div className="puzzle_header">
        Puzzle 7
        </div>
        Make a <span className="monospace">cute_bunny</span> appear on the page!
      </div>
      <div className="puzzle_4">
        <div className="injection_container">
          <form onSubmit={e => e.preventDefault()}>
            <div>Ask and you shall receive: <input value={injectionString} onChange={e => {setInjectionString(e.target.value)}}/></div>
            <br/>
            <div id="response_container">Make the bunny appear here</div>
            {custom_eval(`${injectionString}`)}
            <div className="hidden">You can find the bunny here: {cute_bunny}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Puzzle4;
