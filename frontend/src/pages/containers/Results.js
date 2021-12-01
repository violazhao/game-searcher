import React from "react";
import "./Results.css";


import 'bootstrap/dist/css/bootstrap.min.css';
import GameCard from "./GameCard";
import { Button } from "reactstrap";

const Results = ( {recGames, games, isAdmin} ) => {
  
  return (
    <div className="results">
      <header className="Results-header">
        {recGames.map((recGame) => { return (
          <GameCard key = {recGame.name} game={recGame} isAdmin={isAdmin} />
        )
        })}
        {!isAdmin && <p> You searched for: </p>}
        {games.map((game) => { return (
          <GameCard key = {game.gameId} game={game} isAdmin={isAdmin} />
        )
        })}
        
        {!isAdmin && <Button className="SearchAgain" onClick={event =>  window.location.href='/game-searcher'}>
          Search Again
        </Button>}
        {isAdmin && <Button className="SearchAgain" onClick={event =>  window.location.href='/game-searcher'}>
          Home
        </Button>}
      </header>
    </div>
  )
}

export default Results


