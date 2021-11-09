import React from "react";
import "./AQ2.css";

export default function AQ2() {
  return (
    <div className="aq2">
      <header className="AQ2-header">
        <h1>Advanced Query 2 Results</h1>
        <p>Query for finding which games have a total rating above 50/100 on the Nintendo Switch platform and on the PlayStation 5 platform.</p>
        <p>Results:</p>
        <br></br>
        <button className="Back" onClick={event =>  window.location.href='/game-searcher'}>
            Back
        </button>
      </header>
    </div>
  );
}