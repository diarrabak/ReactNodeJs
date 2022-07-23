import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { getEvent, setEvent } from "../../store/reducers/eventReducer";
import { useSelector } from "react-redux";
//Component used to display the list of all the groups

const ShowEvent = () => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const labEvent:any=useSelector((state:any)=>state.events.currentEvent);
  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  const getSingleEvent = (id: any) => {
    dispatch(getEvent(id))
      .then((Response: AxiosResponse) => dispatch(setEvent(Response.data)))
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSingleEvent(id);
  }, [id]);

  return (
    <main>
      <div>
        <img
          className="top-img card-img-top"
          src={labEvent.picture}
          alt="Card cap"
        />
      </div>
      <div className="row">
        <h1 className="group-title">Details about {labEvent.title} </h1>
        <p className="group-description col-12">{labEvent.description}</p>
        <p className="col-12">
          The event will take place at {labEvent.place} on the {labEvent.date}
        </p>
        <p className="col-12">The presenters are {labEvent.presenters}</p>
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          <Link to="/events"> Back to events list </Link>
        </div>
      </div>
    </main>
  );
};

export default ShowEvent;
