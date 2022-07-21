import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
//Component used to display the list of all the groups

function ShowNews() {
  const {id}:any = useParams();
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
  return (
    <main>
      <div>
        <img
          className="top-img card-img-top"
          src={info.picture}
          alt="Card cap"
        />
      </div>
      <div className="row">
        <h1>Details about {info.title} </h1>
        <p className="group-description col-12">{info.description}</p>
        <p className="col-12">published on {info.date}</p>
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          <Link to="/news"> Back to news list </Link>
        </div>
      </div>
    </main>
  );
}

export default ShowNews;
