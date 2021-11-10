import React, { useState, useEffect } from "react";
import "./Pass.css";
import { updatePassword } from "../../utils/apiWrapper";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default function Pass() {
  const [username, setUsername] = useState("");
  const [newPass, setNewPass] = useState("");
  const changePass = async () => {
    const resp = await updatePassword(username, newPass);
    if (!resp.error) {
      console.log("Password: ", resp.data);
      window.location.href='/game-searcher/login';
    }
  }
  return (
    <div className="main">
      <header className="Pass-header">
        <Form>
        <FormGroup>
            <Label for="userId">
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
            <Label for="currPass">
              Current Password:
            </Label>
            <Input
              type="text"
              //value={currPass}
              id="password-input"
              // placeholder=""
              // onChange={(e) => setCurrPass(e.target.value)}
              required
            />
          </FormGroup>
          <br></br>
          <FormGroup>
            <Label for="newPassword">
              New Password:
            </Label>
            <Input
              type="text"
              value={newPass}
              id="game-min-rating-input"
              // placeholder=""
              onChange={(e) => setNewPass(e.target.value)}
            />
          </FormGroup>
          <br></br>
        </Form>
        <Button
            onClick={changePass}
            className="Pass"
        >
          Change Password
        </Button>
      </header>
    </div>
  );
}