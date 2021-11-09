import React from "react";
import "./Results.css";

const Results = ( {games} ) => {
  return (
    <div className="results">
      <header className="Results-header">
        <h1>Your Recommended Games</h1>
        <p> You searched for: </p>
        <>
          {games.map((game) => (
            <p key = {game.gameId}>{game.name}</p>
          ))}
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


