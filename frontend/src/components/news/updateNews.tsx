import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link, useHistory,useParams } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
//Component used to display the list of all the groups

function UpdateNews() {

  const id = useParams();
  const history=useHistory();
  const [info, setInfo] = useState({
    title: "",
    description: "",
    picture: "",
    date: "",
  });

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  function getNews(id: any) {
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/news/" + id)
      .then((Response) => {
        setInfo({
          title: Response.data.title,
          description: Response.data.description,
          picture: Response.data.picture,
          date: Response.data.date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getNews(id);
  }, [id]);

   //method appending the form data to the group fields

   function submitNews(event: any) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/news/"+id, {
        title: info.title,
        description: info.description,
        picture: info.picture,
        date: info.date,
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
    const [name, value] = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

    return (
      <main>
        <h1>Update news </h1>
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
                value={info.title}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              className="form-label  col-12 col-sm-2"
              htmlFor="description"
            >
              Description
            </label>
            <div className="col-12 col-sm-10">
              <textarea
                className="form-control"
                name="description"
                id="description"
                required
                value={info.description}
                onChange={onChange}
              ></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label className="form-label  col-12 col-sm-2" htmlFor="picture">
              Picture
            </label>
            <div className="col-12 col-sm-10">
              <FileBase
                type="file"
                multiple={false}
                onDone={(base64:any ) => setInfo(prev=>({ ...prev, picture: base64 }))}
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
                  value={info.date}
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
              <Link to="/news"> Back to news list </Link>
            </div>
          </div>
        </form>
      </main>
    );
}

export default withRouter(UpdateNews);
