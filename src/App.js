import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Clipboard } from "./pages/clipboard";

export default class App extends Component {
  static MODULES = {
    CLIPBOARD: "clipboard",
    TODOLIST: "todo-list"
  };

  state = {
    current: App.MODULES.CLIPBOARD
  };

  render() {
    return this.state.current === App.MODULES.CLIPBOARD ? (
      <div className="App">
        <Clipboard />
      </div>
    ) : (
      <div>TODO</div>
    );
  }
}
