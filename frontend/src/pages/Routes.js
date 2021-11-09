import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./containers/Home";
import Navigation from "./containers/Navigation"
import NotFound from "./containers/NotFound";
import Admin from "./containers/Admin";
import Login from "./containers/Login";
import AQ1 from "./containers/AQ1";
import AQ2 from "./containers/AQ2";
import Results from "./containers/Results";
import Pass from "./containers/Pass"
import CreateAccount from "./containers/CreateAccount";
// import NoResults from "./containers/NoResults";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/game-searcher">
                    <Navigation />
                    <Home />
                </Route>
                <Route exact path="/game-searcher/login">
                    <Navigation />
                    <Login />
                </Route>
                <Route exact path="/game-searcher/admin">
                    <Navigation />
                    <Admin />
                </Route>
                <Route exact path="/game-searcher/pass">
                    <Navigation />
                    <Pass />
                </Route>
                <Route exact path="/game-searcher/createaccount">
                    <Navigation />
                    <CreateAccount />
                </Route>
                <Route exact path="/game-searcher/results">
                    <Navigation />
                    <Results />
                </Route>
                <Route exact path="/game-searcher/aq1">
                    <Navigation />
                    <AQ1 />
                </Route>
                <Route exact path="/game-searcher/aq2">
                    <Navigation />
                    <AQ2 />
                </Route>
                {/* <Route exact path="/noresults">
                    <NoResults />
                </Route>
                {/* Catch all unmatched routes */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}