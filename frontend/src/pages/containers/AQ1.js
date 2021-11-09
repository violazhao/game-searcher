import React from "react";
import "./AQ1.css";

export default function AQ1() {
  return (
    <div className="aq1">
      <header className="AQ1-header">
        <h1>Advanced Query 1</h1>
        <p>Query for finding how many games there are for each genre in the Nintendo Switch platform.</p>
        <p>Results:</p>
        <br></br>
        <button className="Back" onClick={event =>  window.location.href='/game-searcher'}>
            Back
        </button>
      </header>
    </div>
  );
}