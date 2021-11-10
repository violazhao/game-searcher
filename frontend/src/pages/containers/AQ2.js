import React, { useState } from "react";
import "./AQ2.css";
import { getAQ2 } from "../../utils/apiWrapper"

export default function AQ2() {
  const [showResults, setShowResults] = useState(false);
  const [games, setGames] = useState([]);

  const fetchAQ2Results = async () => {
    const resp = await getAQ2();
    if (!resp.error) {
      console.log(resp.data);
      setShowResults(true);
      setGames(resp.data);
    }
  }
  return (
    <div className="aq2">
      <header className="AQ2-header">
        <h1>Advanced Query 2 Results</h1>
        <p>Query for finding which games have a total rating above 50/100 on the Nintendo Switch platform (ID#167) and on the PlayStation 5 platform (ID#130).</p>
        {showResults ? 
          <div>
            <p>Results:</p> 
            {games.map((game) => { return (
              <div key = {game.gameId}>
                <p>{game.name}</p>
                <p>Rating: {Math.round(game.total_rating * 100)/100}/100</p>
                <p>Platform #{game.platformId}</p>
              <br></br>
            </div>
            )})}
          </div>
          : 
          <button className="Back" onClick={fetchAQ2Results}>Search</button>
        }
      </header>
    </div>
  );
}