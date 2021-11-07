import React, { useState, useEffect } from "react";
import "./Pass.css";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default function Pass() {
  return (
    <div className="main">
      <header className="Pass-header">
        <Form>
          <FormGroup>
            <Label for="currPass">
              Current Password:
            </Label>
            <Input
              type="text"
              //value={currPass}
              id="username-input"
              // placeholder=""
              onChange={(e) => setCurrPass(e.target.value)}
              required
            />
          </FormGroup>
          <br></br>
          <FormGroup>
            <Label for="newPass">
              New Password:
            </Label>
            <Input
              type="text"
              //value={newPass}
              id="game-min-rating-input"
              // placeholder=""
              onChange={(e) => setNewPass(e.target.value)}
            />
          </FormGroup>
          <br></br>
        </Form>
        <Button
            onClick={event =>  window.location.href='/game-searcher/login'}
            className="Pass"
        >
          Change Password
        </Button>
      </header>
    </div>
  );
}