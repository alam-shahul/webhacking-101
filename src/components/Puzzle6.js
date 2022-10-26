import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../public/stylesheets/puzzle_6.css';

function Puzzle6(props) {
  const hackRef = useRef(null);
  const [responseString, setResponseString] = useState("")
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
        Puzzle 6
        </div>
        Deobfuscate the code!
      </div>
      <div className="puzzle_6">
        <div className="obfuscate_container">
          <br/>
          <div>Below is the definition of a Javascript function that takes two arguments <span className="monospace">a</span> and <span className="monospace">b</span> as inputs.</div>
          <br/>
          <div className="monospace codeblock">{"function randomUnknownFunction(a,b)\{var _0x1e2e99={'lqYrm':function(_0x160faa,_0x38d9ea){return _0x160faa%_0x38d9ea;}};return _0x1e2e99['lqYrm'](a,b);}"}</div>
          <br/>
          <form onSubmit={e => e.preventDefault()}>
            What is the output of the function if <span className="monospace">a=23</span> and <span className="monospace">b=7</span>? <input value={responseString} onChange={e => {setResponseString(e.target.value); props.updatePuzzleHash(JSON.stringify(e.target.value))}}/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Puzzle6;
