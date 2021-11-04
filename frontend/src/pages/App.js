import React from 'react';
import '../css/App.css';
import apiWrapper from '../utils/apiWrapper';

function App() {

  const logGame = async () => {
    apiWrapper
    .get(`/games`)
    .then(response => {
      console.log(response.data[0])
    })
    .catch(e => console.log(e));
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={logGame}>
          Click to see a game! (check console log for result)
        </button>
      </header>
    </div>
  );
}

export default App;
