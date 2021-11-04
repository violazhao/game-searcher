import React from "react";
import "./Admin.css";

export default function Admin() {
  return (
    <div className="admin">
      <header className="Admin-header">
        <h1>Your Favorite Games</h1>
        <br></br>
        <button className="ReturnHome" onClick={event =>  window.location.href='/game-searcher'}>
            Return Home
        </button>
      </header>
    </div>
  );
}