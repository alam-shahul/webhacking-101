import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Select, NativeSelect, TextField, Button} from '@mui/material';
import AutosizeInput from 'react-input-autosize';
import '../public/stylesheets/puzzle_6.css';

function Puzzle6(props) {
  const passwordRef = useRef(null);
  const [name, setName] = useState("Ben Bitdiddle")
  const [address, setAddress] = useState("1600 Pennsylvania Ave")
  const [city, setCity] = useState("Washington")
  const [state, setState] = useState("DC")
  const [zipcode, setZipcode] = useState("20500")
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
          <form className="hackable_form" onSubmit={handleSubmit}>
            <div><TextField name="name" fullWidth label="Name" inputStyle={{minWidth: "150px"}} value={name} onChange={e => setName(e.target.value)}/></div>
            <br/>
            <div><TextField disabled name="address" fullWidth label="Address" inputStyle={{minWidth: "150px"}} value={address} onChange={e => setAddress(e.target.value)}/></div>
            <br/>
            <div><TextField disabled name="city" fullWidth label="City" inputStyle={{minWidth: "150px"}} value={city} onChange={e => setCity(e.target.value)}/></div>
            <br/>
            <div><TextField disabled name="state" fullWidth label="State" inputStyle={{minWidth: "150px"}} value={state} onChange={e => setState(e.target.value)}/></div>
            <br/>
            <div><TextField disabled name="zipcode" fullWidth label="Zipcode" inputStyle={{minWidth: "150px"}} value={zipcode} onChange={e => setZipcode(e.target.value)}/></div>
            <br/>
            <Button type="submit" variant="outlined">Order Package</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Puzzle6;
