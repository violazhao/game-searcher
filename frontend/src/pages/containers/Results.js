import React from "react";
import "./Results.css";
import { addFavorite } from "../../utils/apiWrapper";

const Results = ( {games} ) => {
  return (
    <div className="results">
      <header className="Results-header">
        <h1>Your Recommended Games</h1>
        <p> You searched for: </p>
        <>
          {games.map((game) => { return (
            <div>
              <p className="display" key = {game.gameId}>{game.name}</p> <button className="AddFavs" onClick={addFavorite}> Add to Favorites </button>
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


