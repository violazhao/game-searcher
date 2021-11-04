import React from "react";
import "./Home.css";
import apiWrapper from '../../utils/apiWrapper';

export default function Home() {
  const logGame = async () => {
    apiWrapper
    .get(`/games`)
    .then(response => {
      console.log(response.data[0])
    })
    .catch(e => console.log(e));
  }

  return (
    <div className="main">
      <header className="Home-header">
        <form>
            <label> Game Name:
                <input type="text" />
            </label>
            <br></br>
            <br></br>
            <label> Game Type (Multiplayer, singleplayer, etc):
                <input type="text" />
            </label>
            <br></br>
            <br></br>
            <label> Game Genre (RPG, racing, etc):
                <input type="text" />
            </label>
            <br></br>
            <br></br>
            <br></br>
        </form>
        <button className="Submit" onClick={logGame} onClick={event =>  window.location.href='/game-searcher/results'}>
          Find Game
        </button>
      </header>
    </div>
  );
}