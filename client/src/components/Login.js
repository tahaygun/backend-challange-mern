import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions/userActions";
// import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: ""
      },
      error: null,
      errors: null,
      isloggedIn: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState(nextProps.errors);
    }
    if (nextProps.user.isloggedin) {
      return this.props.history.push("/");
    }
  }
  submitHandler(e) {
    e.preventDefault();
    this.props.loginUser(this.state.data);
  }

  changeHandler(e) {
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
      data: formData
    });
  }

  render() {
    var changeHandler = this.changeHandler;
    return this.state.isloggedIn ? (
      <Redirect to="/" />
    ) : (
      <div className="loginform">
        <h3>Login</h3>
        {this.state.errors &&
          this.state.errors.usernotfound && (
            <p className="text-danger">{this.state.errors.usernotfound.msg}</p>
          )}
        {this.state.errors &&
          this.state.errors.wrongPass && (
            <p className="text-danger">{this.state.errors.wrongPass.msg}</p>
          )}
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              value={this.state.data.email}
              name="email"
              onChange={changeHandler}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            {this.state.errors &&
              this.state.errors.email && (
                <p className="text-danger">{this.state.errors.email.msg}</p>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={changeHandler}
              value={this.state.data.password}
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            {this.state.errors &&
              this.state.errors.password && (
                <p className="text-danger">{this.state.errors.password.msg}</p>
              )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  isloggedin: state.isloggedin
});
export default connect(mapStateToProps, { loginUser })(withRouter(Login));
