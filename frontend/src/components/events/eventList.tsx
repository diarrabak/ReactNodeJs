import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import SingleEvent from "./singleEvent";
import { useDispatch } from "react-redux";
import { getEvents, setEvents } from "../../store/reducers/eventReducer";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

//Main component of group feature
const EventList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const events: any[] = useSelector((state: any) => state.events.allEvents);
  const getAllEvents = () => {
    setLoading(true);
    dispatch(getEvents())
      .then((Response: AxiosResponse) => {
        dispatch(setEvents(Response.data));
        setLoading(false);
      })
      .catch((error: AxiosError) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, [refresh]);

  return (
    <main>
      <h1> Events list</h1>

      <div className="row">
        {/*List of group from the state variable*/}
        {loading ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ClipLoader color="blue" loading={loading} size={100} />
          </div>
        ) : (
          events?.map((event, id) => (
            <SingleEvent event={event} key={id} setRefresh={setRefresh} />
          ))
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
};

export default EventList;
