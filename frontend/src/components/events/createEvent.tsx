import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";

// This component is used to create a new group and save to the database
const CreateEvent = () => {
  const history = useHistory();
  const [labEvent, setlabEvent] = useState({
    title: "",
    description: "",
    picture: "",
    date: "",
    place: "",
    presenters: "",
  });
  //method appending the form data to the group fields

  const submitEvent = (event: any) => {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .post("http://localhost:5000/events", {
        title: labEvent.title,
        description: labEvent.description,
        picture: labEvent.picture,
        date: labEvent.date,
        place: labEvent.place,
        presenters: labEvent.presenters,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    history.push("/events");
  };

  //Function to update the select value
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setlabEvent((prev) => ({ ...prev, [name]: value }));
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: any = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getBase64(files[0])
      .then((result) => setlabEvent((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };

  //redirect function to be included so that we go back to group list each time a new group is added
  return (
    <main>
      <h1>Create a new event</h1>
      {/*Form used to fill the group component*/}
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
          <label className="form-label  col-12 col-sm-2" htmlFor="place">
            Place
          </label>
          <div className="col-12 col-sm-10">
            <textarea
              className="form-control"
              name="place"
              id="place"
              required
              value={labEvent.place}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="presenters">
            Presenters
          </label>
          <div className="col-12 col-sm-10">
            <textarea
              className="form-control"
              name="presenters"
              id="presenters"
              required
              value={labEvent.presenters}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="offset-sm-2 col-12 col-sm-4">
            <input type="submit" className="btn btn-success" />
          </div>
          <div className="col-12 col-sm-6">
            <Link to="/news"> Back to events list </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateEvent;
