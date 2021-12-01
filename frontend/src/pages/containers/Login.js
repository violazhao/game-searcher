import React, { useState } from "react";
import "./Login.css";
import { isUser } from "../../utils/apiWrapper"
import {
  Button,
  Form,
  FormGroup,
  Input,
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
      <h1 style={{color: "white", marginTop: "24vh"}}>Welcome to Game Searcher</h1>
      <div className="Login-header">
        {showResults ?
          <div className="Error">
            Incorrect Login
          </div>
          :
          <div>
            
          </div>
        }
        <Form>
          <FormGroup className="login-input">
            <Input
              type="text"
              value={username}
              id="username-input"
              className="login-input"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="login-input"> 
            <Input
              type="text"
              value={password}
              id="game-min-rating-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </Form>
        <Button
            onClick={login}
            className="Login"
            style={{marginBottom: 8}}
        >
          Login
        </Button>
        <Button
            onClick={event =>  window.location.href='/game-searcher/pass'}
            className="update"
        >
          Change Password
        </Button>
        {/* <Button
            onClick={event =>  window.location.href='/game-searcher/createaccount'}
            className="update"
        >
          Create Account
        </Button> */}
      </div>
    </div>
  );
}