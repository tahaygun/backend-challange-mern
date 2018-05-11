import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { isloggedin } from "../actions/userActions";
import { connect } from "react-redux";
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedin: false
    };
    this.logoutHandler = this.logoutHandler.bind(this);
    this.props.isloggedin();
  }
  logoutHandler() {
    axios.get(process.env.REACT_APP_SECRET_CODE + "/api/logout").then(res => {
      this.setState({ isloggedin: false });
      this.props.pagerefresh();
    });
  }
  componentWillReceiveProps(props) {
    if (props.isloggedin) {
      this.setState({ isloggedin: true });
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="btn btn-success " to="/join">
                  Log In/ Register -
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-success" to="/article/new">
                  {" "}
                  Write a TechTalks Post
                </Link>
              </li>
              <li className="nav-item">
                {this.state.isloggedin && (
                  <button
                    onClick={this.logoutHandler}
                    className="btn btn-warning"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isloggedin: state.isloggedin
});
export default connect(mapStateToProps, { isloggedin })(Nav);
