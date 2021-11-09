import React, { useState, useEffect } from "react";
import "./Home.css";
import { getGames } from '../../utils/apiWrapper';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Results from "./Results";

export default function Home() {
  const [name, setName] = useState("");
  const [minRating, setMinRating] = useState("");
  const [showResults, setShowResults] = useState(false);
  // const [type, setType] = useState("");
  // const [genre, setGenre] = useState("");
  const [games, setGames] = useState([]);

  const getResults = async () => {
    const gamelist = await fetchGames()
    setShowResults(true),
    setGames(gamelist)
    console.log(gamelist);
  }
  // Fetch Tasks
  const fetchGames = async () => {
    const resp = await getGames(name, minRating);

    return resp.data
  }


  return (
    <div className="main">
      <header className="Home-header">
        {!showResults && <div><Form>
          <FormGroup>
            <Label for="gameName">
              Game Name:
            </Label>
            <Input
              type="text"
              value={name}
              id="game-name-input"
              // placeholder=""
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <br></br>
          <FormGroup>
            <Label for="minRating">
              Minimum Rating (out of 100):
            </Label>
            <Input
              type="text"
              pattern="[0-9]*"
              value={minRating}
              id="game-min-rating-input"
              // placeholder=""
              onChange={(e) => setMinRating(e.target.value)}
            />
          </FormGroup>
          <br></br>
            {/* <label> Game Name:
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
            <br></br> */}
        </Form>
        <Button
            onClick={
              getResults
            }
            className="Submit"
        >
          Search
        </Button></div>}
        
        {showResults && <div><Results games={games}/><button className="SearchAgain" onClick={() => setShowResults(false)}>
            Search Again
        </button></div>}
      </header>
    </div>
  );
}