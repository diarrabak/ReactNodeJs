import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";

// This component is used to create a new researcher and save to the database
class CreateResearcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name:"",
      last_name:"",
      email: "",
      password:"",
      picture: "",
      biography:"",
      researchgate: "",
      googlescholar: "",
      roles:[],
      groups: [], //List of all users
      articles:[],
      selectedGroups: [],
      selectedArticles: [],
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeBiography = this.onChangeBiography.bind(this);
    this.onChangeResearchgate = this.onChangeResearchgate.bind(this);
    this.onChangeGooglescholar = this.onChangeGooglescholar.bind(this);
  
    this.onChangeGroups = this.onChangeGroups.bind(this);
    this.onChangeRoles = this.onChangeRoles.bind(this);
    this.onChangeArticles = this.onChangeArticles.bind(this);
  }
  //method appending the form data to the researcher fields

  submitResearcher(event) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .post("http://localhost:5000/researchers", {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        picture: this.state.picture,
        biography:this.state.biography,
        researchgate: this.state.researchgate,
        googlescholar:this.state.googlescholar,
        roles:this.state.roles,
        groups: this.state.selectedGroups,
        articles:this.state.selectedArticles,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    this.props.history.push("/researchers");
  }

  //Function to update the select value
  onChangeGroups(e) {
    this.setState({
      selectedGroups: Array.from(
        e.target.selectedOptions,
        (item) => item.value
      ),
    });
    e.preventDefault();
  }

  onChangeArticles(e) {
    this.setState({
      selectedArticles: Array.from(
        e.target.selectedOptions,
        (item) => item.value
      ),
    });
    e.preventDefault();
  }

  onChangeRoles(e) {
    this.setState({
      roles: Array.from(
        e.target.selectedOptions,
        (item) => item.value
      ),
    });
    e.preventDefault();
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeFname(e) {
    this.setState({
      first_name: e.target.value,
    });
  }

  onChangeLname(e) {
    this.setState({
      last_name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeBiography(e) {
    this.setState({
      biography: e.target.value,
    });
  }

  onChangeGooglescholar(e) {
    this.setState({
      googlescholar: e.target.value,
    });
  }

  onChangeResearchgate(e) {
    this.setState({
      researchgate: e.target.value,
    });
  }

  componentDidMount() {
    axios
      .all([
        axios.get("http://localhost:5000/groups/"),
        axios.get("http://localhost:5000/articles/"),
      ])
      .then(
        axios.spread((groups,articles) => {
          this.setState({
            groups: groups.data,
            articles: articles.data,
          });
          console.log("element=" + groups.data);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  }

  //redirect function to be included so that we go back to researcher list each time a new researcher is added

  render() {
    return (
      <>
        <main>
          <h1>Create a new researcher</h1>
          {/*Form used to fill the researcher component*/}
          <form
            onSubmit={this.submitResearcher.bind(this)}
          >
            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="username">
                Username
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="first_name"
              >
                First name
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  id="first_name"
                  required
                  value={this.state.first_name}
                  onChange={this.onChangeFname}
                />
              </div>
            </div>

            
            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="last_name"
              >
                Last name
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  id="last_name"
                  required
                  value={this.state.last_name}
                  onChange={this.onChangeLname}
                />
              </div>
            </div>

            
            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="email"
              >
               Email
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>
            </div>

            
            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
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
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="biography"
              >
               Biography
              </label>
              <div className="col-12 col-sm-10">
                <textarea
                  type="text"
                  className="form-control"
                  name="biography"
                  id="biography"
                  required
                  value={this.state.biography}
                  onChange={this.onChangeBiography}
                >
                </textarea>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="gate"
              >
               Researchgate
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="gate"
                  id="gate"
                  required
                  value={this.state.researchgate}
                  onChange={this.onChangeResearchgate}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="scholar"
              >
               Google scholar
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="scholar"
                  id="scholar"
                  required
                  value={this.state.googlescholar}
                  onChange={this.onChangeGooglescholar}
                />
              </div>
            </div>


            {/*Since it is a many to many relationship, no need to include users and topics here*/}

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="groups"
              >
                Groups
              </label>
              <div className="col-12 col-sm-10">
                <select
                  multiple={true}
                  value={this.state.selectedGroups}
                  onChange={this.onChangeGroups}
                  className="form-control"
                  name="groups"
                >
                  <option value="">== Choose groups == </option>
                  {/*Capitalize the first letter*/}
                  {this.state.groups.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.title.charAt(0).toUpperCase() +
                        item.title.substring(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="roles"
              >
                Roles
              </label>
              <div className="col-12 col-sm-10">
                <select
                  multiple={true}
                  value={this.state.roles}
                  onChange={this.onChangeRoles}
                  className="form-control"
                  name="roles"
                >
                  <option value="Researcher">Researcher</option>
                  <option value="Student">Student</option>
                  <option value="Admin">Admin </option>
                  <option value="Staff">staff</option>
                  
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="articles"
              >
                Articles
              </label>
              <div className="col-12 col-sm-10">
                <select
                  multiple={true}
                  value={this.state.selectedArticles}
                  onChange={this.onChangeArticles}
                  className="form-control"
                  name="articles"
                >
                  <option value="">== Choose articles == </option>
                  {/*Capitalize the first letter*/}
                  {this.state.articles.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.title.charAt(0).toUpperCase() +
                        item.title.substring(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-2 col-12 col-sm-4">
                <input type="submit" className="btn btn-success" />
              </div>
              {/*Link back to researcher list*/}
              <div className="col-12 col-sm-6">
                <Link to="/researchers"> Back to researcher list </Link>
              </div>
            </div>
          </form>
        </main>
      </>
    );
  }
}

export default withRouter(CreateResearcher);
