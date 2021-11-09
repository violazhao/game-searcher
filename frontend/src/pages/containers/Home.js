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
<<<<<<< Updated upstream
=======
  const uid = "0";
  const selectStyles = {
    control: (styles) => ({
      ...styles,
      minHeight: 40,
      backgroundColor: "white",
    }),
    option: (styles, { data, isDisabled, isSelected }) => {
      return {
        ...styles,
        color: "white",
        backgroundColor: "#7F00FF",
        ":active": {
          ...styles[":active"],
          color: "white",
          backgroundColor: "black",
        },
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "black",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "white",
      };
    },
  }

  const genres = [
    {
        label: "Point-and-click",
        value: 1
    },
    {
        label: "Fighting",
        value: 2
    },
    {
        label: "Shooter",
        value: 3
    },
    {
        label: "Music",
        value: 4
    },
    {
        label: "Platform",
        value: 5
    },
    {
        label: "Puzzle",
        value: 6
    },
    {
        label: "Racing",
        value: 7
    },
    {
        label: "Real Time Strategy (RTS)",
        value: 8
    },
    {
        label: "Role-playing (RPG)",
        value: 9
    },
    {
        label: "Simulator",
        value: 10
    },
    {
        label: "Sport",
        value: 11
    },
    {
        label: "Strategy",
        value: 12
    },
    {
        label: "Turn-based strategy (TBS)",
        value: 13
    },
    {
        label: "Tactical",
        value: 14
    },
    {
        label: "Hack and slash/Beat 'em up",
        value: 15
    },
    {
        label: "Quiz/Trivia",
        value: 16
    },
    {
        label: "Pinball",
        value: 17
    },
    {
        label: "Adventure",
        value: 18
    },
    {
        label: "Indie",
        value: 19
    },
    {
        label: "Arcade",
        value: 20
    },
    {
        label: "Visual Novel",
        value: 21
    },
    {
        label: "Card & Board Game",
        value: 22
    },
    {
        label: "MOBA",
        value: 23
    }
];

  const platforms = [
    {
        label: "Linux",
        value: 1
    },
    {
        label: "Nintendo 64",
        value: 2
    },
    {
        label: "Wii",
        value: 3
    },
    {
        label: "PC (Microsoft Windows)",
        value: 4
    },
    {
        label: "PlayStation",
        value: 5
    },
    {
        label: "PlayStation 2",
        value: 6
    },
    {
        label: "PlayStation 3",
        value: 7
    },
    {
        label: "Xbox",
        value: 8
    },
    {
        label: "Xbox 360",
        value: 9
    },
    {
        label: "PC DOS",
        value: 10
    },
    {
        label: "Mac",
        value: 11
    },
    {
        label: "Commodore C64/128",
        value: 12
    },
    {
        label: "Amiga",
        value: 13
    },
    {
        label: "Nintendo Entertainment System (NES)",
        value: 14
    },
    {
        label: "Super Nintendo Entertainment System (SNES)",
        value: 15
    },
    {
        label: "Nintendo DS",
        value: 16
    },
    {
        label: "Nintendo GameCube",
        value: 17
    },
    {
        label: "Game Boy Color",
        value: 18
    },
    {
        label: "Dreamcast",
        value: 19
    },
    {
        label: "Game Boy Advance",
        value: 20
    }
];
>>>>>>> Stashed changes

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