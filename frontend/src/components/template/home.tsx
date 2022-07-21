import React from "react";
import { Link } from "react-router-dom";
import frontImage from "../images/iyl_cygagalaxygif.gif";
import labImg from "../images/astroimg.jpg";
import eventImg from "../images/admissions-pic.jpg";
import studyImg from "../images/grad-alumni.jpg";
//Home page of the website
const Home = () => {
  return (
    <main className="home">
      <img
        className="home-image"
        src={frontImage}
        alt={"front page of LOSSA lab"}
      />

      <h1 className="home-title"> Welcome to Lossa Lab</h1>

      <div className="row">
        <h2 className="second-title">Learn more about Lossa lab</h2>
        <div className="card col-12 col-md-4">
          <img
            className="card-img-top"
            src={labImg}
            alt="Lab respresentation"
          />
          <div className="card-body">
            <h5 className="card-title">
              <Link to="/groups/">Research groups</Link>
            </h5>
          </div>
        </div>
		<div className="card col-12 col-md-4">
          <img
            className="card-img-top"
            src={studyImg}
            alt="School respresentation"
          />
          <div className="card-body">
            <h5 className="card-title">
              <Link to="/studies/">Study programs</Link>
            </h5>
          </div>
        </div>
		<div className="card col-12 col-md-4">
          <img
            className="card-img-top"
            src={eventImg}
            alt="Event respresentation"
          />
          <div className="card-body">
            <h5 className="card-title">
              <Link to="/events/">Events</Link>{" "}
            </h5>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
