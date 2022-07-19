import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
//Component used to display the list of all the groups

class UpdateArticle extends React.Component {
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

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  componentDidMount() {
    const id = this.props.match.params.id;
    // const { match: { params } } = this.props;
    //console.log("Params= "+ id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/article/" + id)
      .then((Response) => {
        this.setState({
          title: Response.data.title,
          authors: Response.data.authors,
          abstract: Response.data.abstract,
          tags: Response.data.tags,
          file: Response.data.file,
          journal: Response.data.journal,
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

  submitArticle(event) {
    const id = this.props.match.params.id;
    event.preventDefault();
    console.log("index = " + id);
    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/article/" + id, {
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

  render() {
    const { title, authors, abstract, tags, file, journal, year, researchers } =
      this.state;

    return (
      <main>
        <h1>Update an article </h1>
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
                value={title}
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
                value={authors}
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
                value={abstract}
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
                value={tags}
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
                value={journal}
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
              Researchers
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
                <Link to="/articles"> Back to article list </Link>
              </div>
            </div>
        </form>

      </main>
    );
  }
}

export default withRouter(UpdateArticle);
