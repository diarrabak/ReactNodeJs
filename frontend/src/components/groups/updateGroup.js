import React from "react";
import { withRouter } from "react-router";
import {Link } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
//Component used to display the list of all the groups

class UpdateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "",
      researchers: [], //List of all users
      selectedResearchers: [],
      allResearchers:[],
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
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
      .get("http://localhost:5000/group/"+id)
      .then((Response) => {
        this.setState({
          title: Response.data.title,
          description: Response.data.description,
          picture: Response.data.picture,
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }


  submitGroup(event) {
    const id = this.props.match.params.id;
    event.preventDefault();
    console.log("index = " + id);
    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/group/" + id, {
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

      this.props.history.push('/groups');
  }

  render() {
    const { title, description, picture, researchers } = this.state;

    return (
      <main>
        <h1>Update a group </h1>
        <form onSubmit={this.submitGroup.bind(this)}>
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
                value={title}
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
                  value= {description}
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
            </div>
            {/*Link back to group list*/}
            <div className="col-12 col-sm-6">
              <Link to="/groups"> Back to group list </Link>
            </div>
          </div>
        </form>
      </main>
    );
  }
}

export default  withRouter(UpdateGroup) ;
