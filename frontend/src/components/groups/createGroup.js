import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";

// This component is used to create a new group and save to the database
class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "",
      researchers: [], //List of all users
      selectedResearchers: [],
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeResearchers = this.onChangeResearchers.bind(this);
  }
  //method appending the form data to the group fields

  submitGroup(event) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .post("http://localhost:5000/groups", {
        title: this.state.title,
        description: this.state.description,
        picture: this.state.picture,
        researchers: this.state.selectedResearchers,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    this.props.history.push("/groups");
  }

  //Function to update the select value
  onChangeResearchers(e) {
    this.setState({
      selectedResearchers: Array.from(
        e.target.selectedOptions,
        (item) => item.value
      ),
    });
    e.preventDefault();
  }

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

  componentDidMount() {
    axios
      .get("http://localhost:5000/researchers/")
      .then((Response) => {
        this.setState({
          researchers: Response.data,
        });
        console.log("element=" + Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //redirect function to be included so that we go back to group list each time a new group is added

  render() {
    return (
      <>
        <main>
          <h1>Create a new group</h1>
          {/*Form used to fill the group component*/}
          <form
            onSubmit={this.submitGroup.bind(this)}
          >
            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="title">
                Group title
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
                Group description
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

            {/*Since it is a many to many relationship, no need to include users and topics here*/}

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="researchers"
              >
                Group researchers
              </label>
              <div className="col-12 col-sm-10">
                <select
                  multiple={true}
                  value={this.state.selectedResearchers}
                  onChange={this.onChangeResearchers}
                  className="form-control"
                  name="researchers"
                >
                  <option value="">== Choose researchers == </option>
                  {/*Capitalize the first letter*/}
                  {this.state.researchers.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.first_name.charAt(0).toUpperCase() +
                        item.first_name.substring(1)}
                      {item.last_name.charAt(0).toUpperCase() +
                        item.last_name.substring(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-2 col-12 col-sm-4">
                <input type="submit" className="btn btn-success" />
                {/*} <SubmitButton />*/}
                {/* onClick={(event) => (window.location.href = "/group")}*/}
              </div>
              {/*Link back to group list*/}
              <div className="col-12 col-sm-6">
                <Link to="/groups"> Back to group list </Link>
              </div>
            </div>
          </form>
        </main>
      </>
    );
  }
}

export default withRouter(CreateGroup);
