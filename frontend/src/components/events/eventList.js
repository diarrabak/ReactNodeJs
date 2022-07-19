import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


//Main component of group feature
class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [], //List of all events
      currentEventId: "", //Selected group id
      currentEvent: {},
      id:'',
    };
    this.deleteEvent=this.deleteEvent.bind(this);
  }
  //When the component is active on the DOM
  componentDidMount() {
    const url = "http://localhost:5000/events"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => {
        this.setState({
          events: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setCurrentEvent(event, index) {
    this.setState({
      currentEvent: event,
      currentEventId: index,
      id:event._id,
    });
  }

  deleteEvent() {
    const url = "http://localhost:5000/event/" + this.state.id ; //Url of the controller
    // Use of the get controllers through the axios API
    axios
      .delete(url);
      window.location.reload();
  }

  render() {
    const { events } = this.state;
    return (
      <main>
        <h1> Events list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {events.map((event, id) => (
            <div
              className="card col-12 col-md-4"
              onMouseEnter={() => this.setCurrentEvent(event, id)}
              key={id}
            >
              <img
                className="card-img-top"
                src={event.picture}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title"><Link to={"/showEvent/"+ this.state.id }>{event.title} </Link> </h5>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-danger"
                    onClick={this.deleteEvent}
                  >
                    Delete
                  </button>
                </div>

                <div className="col-6">
                  {/*Link to the page of updating a group */}
                  <Link className="btn btn-success" to={"/event/" + this.state.id }> Update </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addEvent"> Add event </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
  }
}

export default EventList;
