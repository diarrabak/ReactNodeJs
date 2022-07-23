import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createEvent, getEvent, updateEvent } from "../../store/reducers/eventReducer";
import getFileBase64 from "../../helpers/fileConversion";
//Component used to display the list of all the groups

const UpdateEvent = () => {
  const { id }: any = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [labEvent, setlabEvent] = useState({
    title: "",
    description: "",
    picture: "",
    date: "",
    place: "",
    presenters: "",
  });

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  const getSingleEvent = (id: any) => {
    // Use of the get controllers through the axios API
    dispatch(getEvent(id))
      .then((Response: any) => setlabEvent(Response.data))
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSingleEvent(id);
  }, [id]);

  const submitEvent = (event: any) => {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    dispatch(updateEvent(id, labEvent))
      .then((response: any) => {
        history.push("/events");
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error: any) => {
        console.log(error);
      });
  };

  //Function to update the select value

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setlabEvent((prev) => ({ ...prev, [name]: value }));
  };


  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getFileBase64(files[0])
      .then((result) => setlabEvent((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <h1>Update event </h1>
      <form onSubmit={submitEvent}>
        <div className="form-group row">
          <label className="form-label col-12 col-sm-2" htmlFor="title">
            Title
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              required
              value={labEvent.title}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="description">
            Description
          </label>
          <div className="col-12 col-sm-10">
            <textarea
              className="form-control"
              name="description"
              id="description"
              required
              value={labEvent.description}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="picture">
            Picture
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="file"
              className="form-control"
              name="picture"
              id="picture"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label col-12 col-sm-2" htmlFor="date">
            Date
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="date"
              className="form-control"
              name="date"
              id="date"
              required
              value={labEvent.date}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label col-12 col-sm-2" htmlFor="place">
            Place
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="place"
              className="form-control"
              name="place"
              id="place"
              required
              value={labEvent.place}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label col-12 col-sm-2" htmlFor="presenters">
            Presenters
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="presenters"
              className="form-control"
              name="presenters"
              id="presenters"
              required
              value={labEvent.presenters}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="offset-sm-2 col-12 col-sm-4">
            <input type="submit" className="btn btn-success" />
          </div>
          {/*Link back to group list*/}
          <div className="col-12 col-sm-6">
            <Link to="/events"> Back to events list </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default UpdateEvent;
