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

export default function Home() {
  const [name, setName] = useState("");
  const [minRating, setMinRating] = useState("");
  // const [type, setType] = useState("");
  // const [genre, setGenre] = useState("");

  const logGame = async () => {
    const resp = await getGames(name, minRating);
    if (!resp.error) {
      console.log("GAMES: ", resp.data);
    }
  }

  return (
    <div className="main">
      <header className="Home-header">
        <Form>
          <FormGroup>
            <Label for="gameName">
              Game Name
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
          <FormGroup>
            <Label for="minRating">
              Minimum Rating (out of 100)
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
            onClick={logGame}
            className="Submit"
        >
          Search
        </Button>
      </header>
    </div>
  );
}