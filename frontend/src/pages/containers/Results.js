import React from "react";
import "./Results.css";
import { addFavorite } from "../../utils/apiWrapper";

const Results = ( {games, isAdmin} ) => {
  const handleAddFavorite = async ( game ) => {
    const resp = await addFavorite(game.gameId, "0");
    if (!resp.error) {
      console.log(resp);
    }
  }
  
  return (
    <div className="results">
      <header className="Results-header">
        <h1>Your Recommended Games</h1>
        <p> You searched for: </p>
        <>
          {games.map((game) => { return (  
            <div key = {game.gameId}>
              <p className="display">{game.name} <button className="AddFavs" onClick={ () => handleAddFavorite(game) }> Add to Favorites </button></p> 
            </div>
          )})}
        </>
        <br></br>
        <button className="SearchAgain" onClick={event =>  window.location.href='/game-searcher'}>
          Search Again
        </button>
      </header>
    </div>
  )
}

export default Results


