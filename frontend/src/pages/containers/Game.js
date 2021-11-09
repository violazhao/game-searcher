import React from 'react'
import "./Game.css";
import { addFavorite } from "../../utils/apiWrapper";

const Game = ( { name } ) => {
    return (
        <div>
            <p className="GameName">{name} <button className="AddFavs" onClick={addFavorite}> Add to Favorites </button></p>
            
        </div>
    )
}

export default Game
