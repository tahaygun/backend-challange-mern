import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
class Addnew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      keywords: "",
      article: "",
      isloggedin: true,
      posted: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/isloggedin")
      .then(answer => {
        this.setState({ isloggedin: answer.data });
      });
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitHandler(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SECRET_CODE + "/api/addarticle", this.state)
      .then(res => {
        if (res.data.errors) {
          console.log(res.data.errors);
          return this.setState({ errors: res.data.errors });
        }
        return this.props.history.push("/");
      });
  }
  render() {
    return this.state.isloggedin ? (
      <div className="container">
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.changeHandler}
              className="form-control"
              id="title"
              placeholder="Title"
            />
            {this.state.errors &&
              this.state.errors.title && (
                <p className="text-danger">{this.state.errors.title.msg}</p>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="title">One sentence summary of your article</label>
            <input
              type="text"
              value={this.state.summary}
              name="summary"
              onChange={this.changeHandler}
              className="form-control"
              id="summary"
              placeholder="Summary"
            />
            {this.state.errors &&
              this.state.errors.summary && (
                <p className="text-danger">{this.state.errors.summary.msg}</p>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="title">Tell your Story</label>
            <textarea
              value={this.state.article}
              name="article"
              onChange={this.changeHandler}
              className="form-control"
              id="article"
              placeholder="Article"
            />
            {this.state.errors &&
              this.state.errors.article && (
                <p className="text-danger">{this.state.errors.article.msg}</p>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="title">Keywords (seperate by comma)</label>
            <input
              type="text"
              value={this.state.keywords}
              name="keywords"
              onChange={this.changeHandler}
              className="form-control"
              id="keywords"
              placeholder="Keywords"
            />
            {this.state.errors &&
              this.state.errors.keywords && (
                <p className="text-danger">{this.state.errors.keywords.msg}</p>
              )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link className="btn btn-primary" to="/">
            Go back{" "}
          </Link>
        </form>
      </div>
    ) : (
      <Redirect to="/join" />
    );
  }
}

export default Addnew;
