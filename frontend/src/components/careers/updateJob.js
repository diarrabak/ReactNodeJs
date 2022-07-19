import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
//Component used to display the list of all the groups

class UpdateJob extends React.Component { 
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

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  componentDidMount() {
    const id = this.props.match.params.id;
    // const { match: { params } } = this.props;
    //console.log("Params= "+ id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/job/" + id)
      .then((Response) => {
        this.setState({
          title: Response.data.title,
          description: Response.data.authors,
          jobtype: Response.data.abstract,
          file: Response.data.file,
          year: Response.data.year,
          researchers: Response.data.researchers,
        });
        //console.log('element='+this.state.currentgroup);
      })
      .catch((error) => {
        console.log(error);
      });

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

  submitJob(event) {
    const id = this.props.match.params.id;
    event.preventDefault();
    console.log("index = " + id);
    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/job/" + id, {
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

    this.props.history.push("/careers");
  }

  render() {
    const { title, description, jobtype, file, year, researchers, allResearchers } =
      this.state;

    return (
      <main>
        <h1>Update a job </h1>
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
                  value={title}
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
                  value={description}
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
                  value={jobtype}
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
                  value={year}
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
                  value={researchers}
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
    );
  }
}

export default withRouter(UpdateJob);
