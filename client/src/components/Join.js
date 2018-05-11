import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
class Join extends Component {
  render() {
    return (
      <div>
        <Login pagerefresh={this.props.pagerefresh} />
        <Register />
      </div>
    );
  }
}

export default Join;
