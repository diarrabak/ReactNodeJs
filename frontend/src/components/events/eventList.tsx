import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SingleEvent from "./singleEvent";


//Main component of group feature
const EventList =()=>{
  const [events,setEvents]=useState([]);
  //When the component is active on the DOM
  const getEvents=()=> {
    const url = "http://localhost:5000/events"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) =>setEvents(Response.data))
      .catch((error) => {
        console.log(error);
      });
  }


  useEffect(()=>{
    getEvents();
  },[])

    return (
      <main>
        <h1> Events list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {events.map((event, id) => <SingleEvent event={event} key={id} />
           
          )}
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

export default EventList;
