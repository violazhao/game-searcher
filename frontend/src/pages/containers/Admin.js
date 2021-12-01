import React, { useState,useEffect } from "react";
import "./Admin.css";
import { getFavorite } from "../../utils/apiWrapper";
import { getRecommendedGames } from "../../utils/apiWrapper";
import Results from "./Results";

export default function Admin() {
  const [games, setGames] = useState([]);
  const [recGames, setRecGames] = useState([]);
  
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

  useEffect(() => {
    const getResults = async () => {

      const resp = await getRecommendedGames();
      if (!resp.error) {
        console.log(resp.data);
        setRecGames(resp.data);
      }
    }

    getResults()
  }, [])

  return (
    <div className="admin">
      <header className="Admin-header">
        <h1 style={{ marginTop: 16 }}>Your Favorite Games</h1>
        <p>You may also like: </p>
        
        <Results games={games} isAdmin={true}/>
        <br></br>
      </header>
    </div>
    
  );
}