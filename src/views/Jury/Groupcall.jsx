import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import VideoCall from "./pages/meeting";
import JoinMeeting from "./pages/join";

import "./style1.css";

export default class Groupcall extends Component {
  render() {
    return (
      <>
        <JoinMeeting />
      </>
    );
  }
}
