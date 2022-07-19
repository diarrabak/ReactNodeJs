import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import FileBase from "react-file-base64";
import { Link } from "react-router-dom";

// This component is used to create a new researcher and save to the database
class CreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description:"",
      jobtype: "",
      file: "",
      year: "",
      researchers: [],
      allResearchers: [], //List of all users
      selectedResearchers: [],
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeJobtype = this.onChangeJobtype.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeResearchers = this.onChangeResearchers.bind(this);
  }
  //method appending the form data to the researcher fields

  submitJob(event) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .post("http://localhost:5000/jobs", {
        title: this.state.title,
        description: this.state.description,
        jobtype: this.state.jobtype,
        file: this.state.file,
        year: this.state.year,
        researchers: this.state.selectedResearchers,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    this.props.history.push("/jobs");
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

  onChangeJobtype(e) {
    this.setState({
      jobtype: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeFile(e) {
    this.setState({
      file: e.target.value,
    });
  }

  onChangeYear(e) {
    this.setState({
      year: e.target.value,
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/researchers/")
      .then((Response) => {
        this.setState({
          allResearchers: Response.data,
        });
        console.log("element=" + Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //redirect function to be included so that we go back to researcher list each time a new researcher is added

  render() {
    return (
      <>
        <main>
          <h1>Create a new job</h1>
          {/*Form used to fill the researcher component*/}
          <form onSubmit={this.submitJob.bind(this)}>
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
              <label className="form-label  col-12 col-sm-2" htmlFor="description">
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
                ></textarea>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="jobtype"
              >
                Jobtype
              </label>
              <div className="col-12 col-sm-10">
                <select
                  multiple={false}
                  value={this.state.jobtype}
                  onChange={this.onChangeJobtype}
                  className="form-control"
                  name="jobtype"
                >
                  <option value="PhD">PhD</option>
                  <option value="Internship">Internship</option>
                  <option value="Other positions">Other</option>
                  
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label  col-12 col-sm-2" htmlFor="file">
                File
              </label>
              <div className="col-12 col-sm-10">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => this.setState({ file: base64 })}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label  col-12 col-sm-2" htmlFor="year">
                Year
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  name="year"
                  id="year"
                  required
                  value={this.state.year}
                  onChange={this.onChangeYear}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="researchers"
              >
                Contact researchers
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
                  {this.state.allResearchers.map((item) => (
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
                <Link to="/careers"> Back to jobs list </Link>
              </div>
            </div>
          </form>
        </main>
      </>
    );
  }
}

export default withRouter(CreateJob);
