import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import getFileBase64 from "../../helpers/fileConversion";
// This component is used to create a new group and save to the database
function CreateNews() {
  const history = useHistory();
  const [news, setNews] = useState({
    title: "",
    description: "",
    picture: "",
    date: "",
  });

  //method appending the form data to the group fields

  function submitNews(event: any) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .post("http://localhost:5000/news", {
        title: news.title,
        description: news.description,
        picture: news.picture,
        date: news.date,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    history.push("/news");
  }

  //Function to update the select value

  function onChange(e: any) {
    const {name, value} = e.target;
    setNews((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getFileBase64(files[0])
      .then((result) => setNews((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <h1>Create news</h1>
      {/*Form used to fill the group component*/}
      <form onSubmit={submitNews}>
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
              value={news.title}
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
              value={news.description}
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
              value={news.date}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="offset-sm-2 col-12 col-sm-4">
            <input type="submit" className="btn btn-success" />
          </div>
          <div className="col-12 col-sm-6">
            <Link to="/news"> Back to news list </Link>
          </div>
        </div>
      </form>
    </main>
  );
}

export default CreateNews;
