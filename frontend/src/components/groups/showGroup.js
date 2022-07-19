import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
//Component used to display the list of all the groups

class ShowGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "",
      researchers: [], //List of all users
      groupResearchers: [],
    };
  }

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/group/" + id)
      .then((Response) => {
        this.setState({
          title: Response.data.title,
          description: Response.data.description,
          picture: Response.data.picture,
          researchers: Response.data.researchers,
        });

        for (let researcher of this.state.researchers) {
          console.log("Rsearcher= " + researcher);
          axios
            .get(
              "http://localhost:5000/researcher/" + researcher
            )
            .then((Res) => {
              this.setState({
                groupResearchers: [...this.state.groupResearchers, Res.data],
              });
              console.log("name=" + Response.data);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { title, description, picture, researchers, groupResearchers } = this.state;

    return (
      <main>
        <div>
          <img className="top-img card-img-top" src={picture} alt="Card cap" />
        </div>
        <div className="row">
          <h1 className="group-title">Details about {title} group </h1>
          <p className="group-description col-12">{description}</p>
        </div>


        <div className="row">
          <h2>Researchers in {title} group</h2>
       
          {groupResearchers.map((researcher, id) => (
            <div key={id}
              className="card col-12 col-sm-4"
            >
              <img
                className="card-img-top"
                src={researcher.picture}
                alt="Card cap"
              />
              <p>
                <Link
                  className="btn btn-success"
                  to={"/showResearcher/" + researcher._id}
                >
                  {researcher.first_name}
                  {' '}
                  {researcher.last_name}
                </Link>
              </p>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <Link to="/groups"> Back to group list </Link>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(ShowGroup);
