import React, { useState, useEffect } from "react";
import "./Login.css";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default function Login() {
  return (
    <div className="main">
      <header className="Login-header">
        <Form>
          <FormGroup>
            <Label for="username">
              Username:
            </Label>
            <Input
              type="text"
              //value={username}
              id="username-input"
              // placeholder=""
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <br></br>
          <FormGroup>
            <Label for="passHash">
              Password:
            </Label>
            <Input
              type="text"
              //value={passHash}
              id="game-min-rating-input"
              // placeholder=""
              onChange={(e) => setPassHash(e.target.value)}
            />
          </FormGroup>
          <br></br>
        </Form>
        <Button
            onClick={event =>  window.location.href='/game-searcher/admin'}
            className="Login"
        >
          Login
        </Button>
        <br></br>
        <Button
            onClick={event =>  window.location.href='/game-searcher/pass'}
            className="Login"
        >
          Change Password
        </Button>
      </header>
    </div>
  );
}