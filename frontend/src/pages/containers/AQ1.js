import React, { useState } from "react";
import { getAQ1 } from "../../utils/apiWrapper";
import "./AQ1.css";

export default function AQ1() {
  const [showResults, setShowResults] = useState(false);
  const [genres, setGenres] = useState([]);

  const fetchAQ1Results = async () => {
    const resp = await getAQ1();
    if (!resp.error) {
      console.log(resp.data);
      setShowResults(true);
      setGenres(resp.data);
    }
  }
  return (
    <div className="aq1">
      <header className="AQ1-header">
        <h1>Advanced Query 1 Results</h1>
        <p>Query for finding how many games there are for each genre in the Nintendo Switch platform. (ID#167)</p>
        {showResults ? 
          <div>
            <p>Results:</p>
            {genres.map((genre) => { return (
              <div key = {genre.genreId}>
                <br></br>
                <p>Genre: {genre.name}</p>
                <p>Number of Games: {genre.numGames}</p>
              </div>
            )})}
          </div>
          : 
          <button className="Back" onClick={fetchAQ1Results}>Search</button>
        }
      </header>
    </div>
  );
}