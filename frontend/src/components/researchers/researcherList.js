import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


//Main component of researcher feature
class ResearcherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      researchers: [], //List of all groups
      currentResearcherId: "", //Selected group id
      currentResearcher: {},
      id:'',
    };
    this.deleteResearcher=this.deleteResearcher.bind(this);
  }
  //When the component is active on the DOM
  componentDidMount() {
    const url = "http://localhost:5000/researchers"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => {
        this.setState({
          researchers: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setCurrentResearcher(researcher, index) {
    this.setState({
      currentResearcher: researcher,
      currentResearcherId: index,
      id:researcher._id,
    });
  }

  deleteResearcher() {
    const url = "http://localhost:5000/researcher/" + this.state.id ; //Url of the controller
    // Use of the get controllers through the axios API
    axios
      .delete(url);
      window.location.reload();
  }

  render() {
    const { researchers } = this.state;
    return (
      <main>
        <h1> Researcher list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {researchers.map((researcher, id) => (
            <div
              className="card col-12 col-md-4"
              onClick={() => this.setCurrentResearcher(researcher, id)}
              onMouseEnter={() => this.setCurrentResearcher(researcher, id)}
              key={id}
            >
              <img
                className="card-img-top"
                src={researcher.picture}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title"><Link to={"/showResearcher/"+ this.state.id }>{researcher.first_name}{' '} {researcher.last_name}</Link> </h5>
                <p className="card-text">{researcher.biography}</p>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-danger"
                    onClick={this.deleteResearcher}
                  >
                    Delete
                  </button>
                </div>

                <div className="col-6">
                  {/*Link to the page of updating a group */}
                  <Link className="btn btn-success" to={"/researcher/" + this.state.id }> Update </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addResearcher"> Add new researcher </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
  }
}

export default ResearcherList;
