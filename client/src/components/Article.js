import React, { Component } from "react";
import { Link } from "react-router-dom";
class Article extends Component {
  render() {
    var article = this.props.article;
    return (
      <div className="card">
        <h5 className="card-header">
          posted by{" "}
          <Link to={"/user/" + article.user._id}>{article.user.fullname}</Link>
        </h5>
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <Link
            to={"/articles/" + article._id}
            className="btn btn-sm btn-primary"
          >
            Read Article
          </Link>
        </div>
      </div>
    );
  }
}
export default Article;
