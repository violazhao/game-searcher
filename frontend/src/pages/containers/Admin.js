import React, { useState,useEffect } from "react";
import "./Admin.css";
import { getFavorite } from "../../utils/apiWrapper";
import Results from "./Results";

export default function Admin() {
  const [games, setGames] = useState([]);
  
  
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
        <h1>Your Favorite Games</h1>
        <Results games={games} isAdmin={true}/>
        <br></br>
        <button className="ReturnHome" onClick={event =>  window.location.href='/game-searcher'}>
            Return Home
        </button>
      </header>
      
    </div>
    
  );
}