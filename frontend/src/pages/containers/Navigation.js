import React from "react";
import "./Navigation.css"

export default function Navigation() {
    return (
        <div className="nav">
            <a href="/game-searcher">Game Searcher</a>
            <a href="/game-searcher/login">Admin</a>
            <a href="/game-searcher/aq1">Advanced Query 1</a>
            <a href="/game-searcher/aq2">Advanced Query 2</a>
        </div>
    );
}