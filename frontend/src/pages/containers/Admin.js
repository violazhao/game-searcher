import React, { useState,useEffect } from "react";
import "./Admin.css";
import { getFavorite } from "../../utils/apiWrapper";
import { getRecommendedGames } from "../../utils/apiWrapper";
import Results from "./Results";

export default function Admin() {
  const [games, setGames] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [recGames, setRecGames] = useState([]);

  const fetchRecGames = async () => {
    const resp = await getRecommendedGames();
    if (!resp.error) {
      console.log(resp.data);
      setShowResults(true);
      setRecGames(resp.data);
    }
  }
  
  useEffect(() => {
    const getResults = async () => {

      const resp = await getFavorite("0");
      if (!resp.error) {
        console.log(resp.data);
        setGames(resp.data);
      }
    }

    getResults()
  }, [])

  return (
    <div className="admin">
      <header className="Admin-header">
        <h1 style={{ marginTop: 16 }}>Your Favorite Games</h1>
        {showResults ? 
          <div class = "Recommended">
            <p class = "recHeader">Your Recommended Games:</p>
            {recGames.map((recGame) => { return (
              <div key = {recGame.gameId}>
                <br></br>
                <p> {recGame.game}</p>
                <p>Rating: {recGame.rating}</p>
              </div>
            )})}
          </div>
          : 
          <button className="getRecs" onClick={fetchRecGames}>Click to see your recommended games!</button>
        }
        <Results games={games} isAdmin={true}/>
        <br></br>
      </header>
    </div>
    
  );
}