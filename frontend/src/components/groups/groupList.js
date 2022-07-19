import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


//Main component of group feature
class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [], //List of all groups
      currentGroupId: "", //Selected group id
      currentGroup: {},
      id:'',
    };
    this.deleteGroup=this.deleteGroup.bind(this);
  }
  //When the component is active on the DOM
  componentDidMount() {
    const url = "http://localhost:5000/groups"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => {
        this.setState({
          groups: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setCurrentGroup(group, index) {
    this.setState({
      currentGroup: group,
      currentGroupId: index,
      id:group._id,
    });
  }

  deleteGroup() {
    const url = "http://localhost:5000/group/" + this.state.id ; //Url of the controller
    // Use of the get controllers through the axios API
    axios
      .delete(url);
      window.location.reload();
  }

  render() {
    const { groups } = this.state;
    return (
      <main>
        <h1> Group list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {groups.map((group, id) => (
            <div
              className="card col-12 col-md-4"
              onClick={() => this.setCurrentGroup(group, id)}
              onMouseEnter={() => this.setCurrentGroup(group, id)}
              key={id}
            >
              <img
                className="card-img-top"
                src={group.picture}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title"><Link to={"/showGroup/"+ this.state.id }>{group.title} </Link> </h5>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-danger"
                    onClick={this.deleteGroup}
                  >
                    Delete
                  </button>
                </div>

                <div className="col-6">
                  {/*Link to the page of updating a group */}
                  <Link className="btn btn-success" to={"/group/" + this.state.id }> Update </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addGroup"> Add new group </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
  }
}

export default GroupList;
