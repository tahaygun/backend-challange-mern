import React, { Component } from "react";
import axios from "axios";
import Article from "./Article";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    axios
      .get(
        process.env.REACT_APP_SECRET_CODE +
          "/api/getuser/" +
          this.props.match.params.id
      )
      .then(user => this.setState({ user: user.data }));
  }

  render() {
    var user = this.state.user;
    return this.state.user ? (
      <div className="container">
        <h3>{user.user.fullname}</h3>
        <h6>{user.user.aboutyou}</h6>
        <br />
        <h5>All articles of {user.user.fullname} on Tech Talks </h5>
        {user.articles.map(article => {
          return <Article key={article._id} article={article} />;
        })}
      </div>
    ) : (
      <p>Loading</p>
    );
  }
}

export default User;
