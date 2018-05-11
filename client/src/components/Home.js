import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";
import Article from "./Article";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      randomone: null,
      isloggedin: false
    };
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/isloggedin")
      .then(res => {
        this.setState({ isloggedin: res.data });
      });
    this.props.fetchPosts();
  }
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/getrandomone")
      .then(randomone => {
        this.setState({ randomone: randomone.data });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="navbar2">
          <h3>Welcome to TechTalks!</h3> <br />
          <p>Read, write and share tech stories that matter</p>
          <br />
        </div>
        <div className="container">
          <br />
          <h5 className="header">A Random article for you to enjoy:</h5>
          {this.state.randomone && <Article article={this.state.randomone} />}
          <br />
          <br />
          <h5 className="header">Latest articles</h5>
          {this.props.posts &&
            this.props.posts.map(article => {
              return <Article key={article._id} article={article} />;
            })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps, { fetchPosts })(Home);
