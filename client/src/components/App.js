import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Join from "./Join";
import Showone from "./Showone";
import Addnew from "./Addnew";
import User from "./User";
import test from "./test";
import Nav from "./Nav";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../store";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedin: false
    };
    this.pagerefresh = this.pagerefresh.bind(this);
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/isloggedin")
      .then(answer => {
        this.setState({ isloggedin: answer.data });
      });
  }

  pagerefresh() {
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/isloggedin")
      .then(answer => {
        this.setState({ isloggedin: answer.data });
      });
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Nav
              pagerefresh={this.pagerefresh}
              isloggedin={this.state.isloggedin}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/join"
                render={() => (
                  <Join
                    history={this.props.history}
                    pagerefresh={this.pagerefresh}
                  />
                )}
              />
              <Route exact path="/articles/:id" component={Showone} />
              <Route exact path="/article/new" component={Addnew} />
              <Route exact path="/user/:id" component={User} />
              <Route exact path="/test" component={test} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
