import React from "react";
import "./Results.css";
import { addFavorite } from "../../utils/apiWrapper";
import { removeFavorite } from "../../utils/apiWrapper";

const Results = ( {games, isAdmin} ) => {
  const handleAddFavorite = async ( game ) => {
    const resp = await addFavorite(game.gameId, "0");
    if (!resp.error) {
      console.log(resp);
    }
  }
  const handleRemoveFavorite = async ( game ) => {
    const resp = await removeFavorite(game.gameId, "0");
    if (!resp.error) {
      console.log(resp);
    }
    window.location.href='/game-searcher/admin'
  }
  
  return (
    <div className="results">
      <header className="Results-header">
        {!isAdmin && <p> You searched for: </p>}
        
        <>
          {games.map((game) => { return (  
            <div key = {game.gameId}>
              <p className="display">{game.name} {isAdmin ? <button className="AddFavs" onClick={ () => handleRemoveFavorite(game) }> Remove From Favorites </button> : <button className="AddFavs" onClick={ () => handleAddFavorite(game)}> Add to Favorites </button>}</p> 
            </div>
          )})}
        </>
        <br></br>
        {!isAdmin && <button className="SearchAgain" onClick={event =>  window.location.href='/game-searcher'}>
          Search Again
        </button>}
        {isAdmin && <button className="SearchAgain" onClick={event =>  window.location.href='/game-searcher'}>
          Home
        </button>}
      </header>
    </div>
  )
}

export default Results


