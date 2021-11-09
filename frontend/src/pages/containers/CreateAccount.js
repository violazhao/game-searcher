import React, { useState, useEffect } from "react";
import "./CreateAccount.css";
import { createUser } from "../../utils/apiWrapper"
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const createAccount = async () => {
      const resp = await createUser(username, password);
      if (!resp.error) {
          console.log("User: ", resp.data);
          window.location.href='/game-searcher/admin';
      }
  }
    
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
              value={username}
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
              value={password}
              id="game-min-rating-input"
              // placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <br></br>
        </Form>
        <Button
            onClick={createAccount}
            className="Login"
        >
          Create Account
        </Button>
      </header>
    </div>
  );
}