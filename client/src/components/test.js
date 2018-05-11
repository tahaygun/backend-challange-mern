import React from "react";
import axios from "axios";

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }
  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  uploadHandler = () => {
    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(formData);
    axios.post("http://localhost:8000/api/picture", formData).then(res => {
      console.log(res.data);
    });
  };
  render() {
    return (
      <div>
        <input type="file" onChange={this.fileChangedHandler} />
        <button onClick={this.uploadHandler}>Upload!</button>
        <img src="/../server/uploads/files\image-1525613312017.png" alt="" />
      </div>
    );
  }
}

export default SimpleReactFileUpload;
