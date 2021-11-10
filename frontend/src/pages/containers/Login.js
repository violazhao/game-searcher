import React, { useState, useEffect } from "react";
import "./Login.css";
import { isUser } from "../../utils/apiWrapper"
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default function Login() {
  const [showResults, setShowResults] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    const resp = await isUser(username, password);
    if (!resp.error) {
      console.log("Attempt Login");
      console.log(resp.data[0].isValid);
      if (resp.data[0].isValid == 1) {
        console.log("it worked!");
        window.location.href='/game-searcher/admin';
      }
      else {
        console.log("Incorrect password or user does not exist");
        setShowResults(true);
      }
    }
  }

  return (
    <div className="main">
      <header className="Login-header">
        {showResults ?
          <div className="Error">
            Incorrect Login
          </div>
          :
          <div>
            
          </div>
        }
        <Form>
          <FormGroup>
            <Label for="username">
              Username:
            </Label>
            <Input
              type="text"
              value={username}
              id="username-input"
              // placeholder=""
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <br></br>
          <FormGroup>
            <Label for="password">
              Password:
            </Label>
            <Input
              type="text"
              value={password}
              id="game-min-rating-input"
              // placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <br></br>
        </Form>
        <Button
            onClick={login}
            className="Login"
        >
          Login
        </Button>
        <br></br>
        <Button
            onClick={event =>  window.location.href='/game-searcher/pass'}
            className="Update"
        >
          Change Password
        </Button>
        <Button
            onClick={event =>  window.location.href='/game-searcher/createaccount'}
            className="Update"
        >
          Create Account
        </Button>
      </header>
    </div>
  );
}