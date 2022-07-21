import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
//Component used to display the list of all the groups

const ShowEvent=()=> {

  const id = useParams();
 const [labEvent,setlabEvent]=useState({
      title: "",
      description: "",
      picture: "",
      date: "",
      place: "",
      presenters:"",
 });
    

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  const getEvent=(id:any)=> {
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/event/" + id)
      .then((Response) => 
        setlabEvent({
          title: Response.data.title,
          description: Response.data.description,
          picture: Response.data.picture,
          date: Response.data.date,
          place: Response.data.place,
          presenters: Response.data.presenters,
        }))
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(()=>{
 getEvent(id);
  },[id])

    return (
      <main>
        <div>
          <img className="top-img card-img-top" src={labEvent.picture} alt="Card cap" />
        </div>
        <div className="row">
          <h1 className="group-title">Details about {labEvent.title} </h1>
          <p className="group-description col-12">{labEvent.description}</p>
          <p className="col-12">The event will take place at {labEvent.place} on the {labEvent.date}</p>
          <p className="col-12">The presenters are {labEvent.presenters}</p>
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <Link to="/events"> Back to events list </Link>
          </div>
        </div>
      </main>
    );
}

export default ShowEvent;
