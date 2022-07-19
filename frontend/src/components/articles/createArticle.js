import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import FileBase from "react-file-base64";
import { Link } from "react-router-dom";

// This component is used to create a new researcher and save to the database
class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      authors: "",
      abstract: "",
      tags: "",
      file: "",
      journal: "",
      year: "",
      researchers: [],
      allResearchers: [], //List of all users
      selectedResearchers: [],
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthors = this.onChangeAuthors.bind(this);
    this.onChangeAbstract = this.onChangeAbstract.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeJournal = this.onChangeJournal.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeResearchers = this.onChangeResearchers.bind(this);
  }
  //method appending the form data to the researcher fields

  submitArticle(event) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .post("http://localhost:5000/articles", {
        title: this.state.title,
        authors: this.state.authors,
        abstract: this.state.abstract,
        tags: this.state.tags,
        file: this.state.file,
        journal: this.state.journal,
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
    this.props.history.push("/articles");
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

  onChangeAuthors(e) {
    this.setState({
      authors: e.target.value,
    });
  }

  onChangeAbstract(e) {
    this.setState({
      abstract: e.target.value,
    });
  }

  onChangeTags(e) {
    this.setState({
      tags: e.target.value,
    });
  }

  onChangeFile(e) {
    this.setState({
      file: e.target.value,
    });
  }

  onChangeJournal(e) {
    this.setState({
      journal: e.target.value,
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
          <h1>Create a new article</h1>
          {/*Form used to fill the researcher component*/}
          <form onSubmit={this.submitArticle.bind(this)}>
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
              <label className="form-label  col-12 col-sm-2" htmlFor="authors">
                Authors
              </label>
              <div className="col-12 col-sm-10">
                <textarea
                  className="form-control"
                  name="authors"
                  id="authors"
                  required
                  value={this.state.authors}
                  onChange={this.onChangeAuthors}
                ></textarea>
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label  col-12 col-sm-2" htmlFor="authors">
                Abstract
              </label>
              <div className="col-12 col-sm-10">
                <textarea
                  className="form-control"
                  name="abstract"
                  id="abstract"
                  required
                  value={this.state.abstract}
                  onChange={this.onChangeAbstract}
                ></textarea>
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label  col-12 col-sm-2" htmlFor="authors">
                Tags
              </label>
              <div className="col-12 col-sm-10">
                <textarea
                  className="form-control"
                  name="tags"
                  id="tags"
                  required
                  value={this.state.tags}
                  onChange={this.onChangeTags}
                ></textarea>
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
              <label className="form-label  col-12 col-sm-2" htmlFor="journal">
                Journal
              </label>
              <div className="col-12 col-sm-10">
                <textarea
                  className="form-control"
                  name="journal"
                  id="journal"
                  required
                  value={this.state.journal}
                  onChange={this.onChangeJournal}
                ></textarea>
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
                Researchers
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
                <Link to="/articles"> Back to article list </Link>
              </div>
            </div>
          </form>
        </main>
      </>
    );
  }
}

export default withRouter(CreateArticle);
