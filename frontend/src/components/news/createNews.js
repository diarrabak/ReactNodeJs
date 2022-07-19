import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";

// This component is used to create a new group and save to the database
class CreateNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "",
     date:"",
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  }
  //method appending the form data to the group fields

  submitNews(event) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .post("http://localhost:5000/news", {
        title: this.state.title,
        description: this.state.description,
        picture: this.state.picture,
        date: this.state.date,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    this.props.history.push("/news");
  }

  //Function to update the select value

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePicture(e) {
    this.setState({
      picture: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  //redirect function to be included so that we go back to group list each time a new group is added

  render() {
    return (
      <>
        <main>
          <h1>Create news</h1>
          {/*Form used to fill the group component*/}
          <form
            onSubmit={this.submitNews.bind(this)}
          >
            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="title">
                Title
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="description"
              >
                Description
              </label>
              <div className="col-12 col-sm-10">
                <textarea
                  className="form-control"
                  name="description"
                  id="description"
                  required
                 value={this.state.description}
                  onChange={this.onChangeDescription}
                >
                </textarea>
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label  col-12 col-sm-2" htmlFor="picture">
                Picture
              </label>
              <div className="col-12 col-sm-10">
                <FileBase 
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    this.setState({ picture: base64 })
                  }
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="date">
                Date
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="date"
                  required
                  value={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-2 col-12 col-sm-4">
                <input type="submit" className="btn btn-success" />
              </div>
              <div className="col-12 col-sm-6">
                <Link to="/news"> Back to news list </Link>
              </div>
            </div>
          </form>
        </main>
      </>
    );
  }
}

export default withRouter(CreateNews);
