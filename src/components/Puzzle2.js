import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../public/stylesheets/puzzle_2.css';

function Puzzle2(props) {
  const passwordRef = useRef(null);
  const [password, setPassword] = useState("youvebeenpwned")
  const [copiedPassword, setCopiedPassword] = useState("")
  const navigate = useNavigate()
  useEffect(() =>
    {
      passwordRef.current.innerHTML = "<input type='password' value='youvebeenpwned' readOnly/>"
      if (! props.unlocked)
        navigate("/")
    }
  )
  return (
    <div className="puzzle">
      <div className="puzzle_title">
        <div className="puzzle_header">
        Puzzle 2
        </div>
        Copy the password!
      </div>
      <div className="puzzle_1">
        <div className="password_container">
          <form>
            <br/>
            <div>Original password: <span id="overwrite" ref={passwordRef}></span></div>
            <br/>
            <div>Copy the password here: <input name="password" type="password" value={copiedPassword} onChange={e => {setCopiedPassword(e.target.value); props.updatePuzzleHash(JSON.stringify(e.target.value))}}/></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Puzzle2;
