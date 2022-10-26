import { useState, useEffect } from 'react';
import '../public/stylesheets/searchbar_puzzle.css';

function SearchBarPuzzle(props) {
  const [isCheckSearchBar, setIsCheckingSearchBar] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    if (isCheckSearchBar) {
      let searchBar = document.getElementById("search-bar");
      console.log(searchBar.value)
      if (searchBar && searchBar.tagName === "INPUT" && searchBar.value === "cat videos") {
        props.updatePuzzleHash(JSON.stringify({
            tag_name: searchBar.tagName,
            value: searchBar.value
          })
        )
      }
    }
    setIsCheckingSearchBar(false);
  });
  return (
    <div className="puzzle">
      <div className="puzzle_title">
        <div className="puzzle_header">
        Puzzle 3
        </div>
        Search for cat videos!
      </div>
      <div className="puzzle_description">It doesn't seem like the search bar is accepting your <span className="monospace">input</span>...</div>
      <br/>

      <div className="browser-container">
        <div className="browser-top">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <div className="browser-content">
        <nav>
          <ul>
            <li className="nav-right"><a >gmail</a></li>
            <li><a >images</a></li>
            <li>
              <div className="box-grid">
                <div className="box-item">.</div>
                <div className="box-item"></div>
                <div className="box-item"></div>
                <div className="box-item"></div>
                <div className="box-item"></div>
                <div className="box-item"></div>
                <div className="box-item"></div>
                <div className="box-item"></div>
                <div className="box-item"></div>
              </div>
            </li>
            <li className="sign-in-button">sign in</li>
          </ul>
        </nav>

        <div className="google-function">
          <p>
            <span className="google-name">T</span>
            <span className="google-name">e</span>
            <span className="google-name">c</span>
            <span className="google-name">h</span>
            <span className="google-name">N</span>
            <span className="google-name">i</span>
            <span className="google-name">g</span>
            <span className="google-name">h</span>
            <span className="google-name">t</span>
            <span className="google-name">s</span>
          </p>
          
            <div className="search-bar-container">
              <div id="search-bar">cat videos</div>
                <button className="google-button search-button" onClick={() => setIsCheckingSearchBar(true)}>Search</button>
            </div>

            <div className="button-group">
              <button className="google-button">Bookmarks</button>
              <button className="google-button">I'm Feeling Lucky</button>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBarPuzzle;
