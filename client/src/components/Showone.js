import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Showone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    };

    axios
      .get(
        process.env.REACT_APP_SECRET_CODE +
          "/api/getone/" +
          this.props.match.params.id
      )
      .then(article => {
        this.setState({ info: article.data });
      });
  }

  render() {
    var art = this.state.info;
    return art ? (
      <div className="container">
        <h3 className="display-4">{art.title}</h3> <hr />
        <p className="article">{art.article}</p> <hr />
        <h5>Too long? Didn't reat?</h5> <hr />
        <p className="summary">{art.summary}</p> <hr />
        <p>The author marked this article with the following keywords:</p>{" "}
        <br />
        <p>{art.keywords}</p>
        <Link className="btn btn-primary" to="/">
          Back to Homepage
        </Link>
      </div>
    ) : (
      <p>Loading</p>
    );
  }
}

export default Showone;
