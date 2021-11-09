import React from "react";
import "./Results.css";
<<<<<<< Updated upstream
=======
import "./Game.css"
import Game from "./Game";
import { addFavorite } from "../../utils/apiWrapper";
>>>>>>> Stashed changes

const Results = ( {games} ) => {
  return (
    <div className="results">
      <header className="Results-header">
        <h1>Your Recommended Games</h1>
        <p> You searched for: </p>
        <div>
        <p className="Header">Name</p>
        </div>
        <>
<<<<<<< Updated upstream
          {games.map((game) => (
            <p key = {game.gameId}>{game.name}</p>
          ))}
=======
          {games.map((game) => { return (
              <Game key = {game.gameId} name = {game.name}/>
          )})}
>>>>>>> Stashed changes
        </>
        <br></br>
      </header>
    </div>
  )
}

export default Results


