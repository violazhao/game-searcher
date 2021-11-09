import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./containers/Home";
import Navigation from "./containers/Navigation"
import NotFound from "./containers/NotFound";
import Admin from "./containers/Admin";
import Login from "./containers/Login";
// import Loading from "./containers/Loading";
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
                {/* <Route exact path="/loading">
                    <Loading />
                </Route> */}
                <Route exact path="/game-searcher/results">
                    <Navigation />
                    <Results />
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