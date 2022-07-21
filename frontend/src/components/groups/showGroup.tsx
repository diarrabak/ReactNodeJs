import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
//Component used to display the list of all the groups

const ShowGroup = () => {
  const {id}:any = useParams();
  const [group, setGroup] = useState({
    title: "",
    description: "",
    picture: "",
    researchers: [""], //List of all users
  });

  const [allResearchers, setAllResearchers] = useState<any[]>([]);
  const groupResearchers: any[] = allResearchers.filter((author: any) =>
    group?.researchers?.includes(author._id)
  );

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  function getGroup(id: any) {
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/group/" + id)
      .then((Response) =>
        setGroup({
          title: Response.data.title,
          description: Response.data.description,
          picture: Response.data.picture,
          researchers: Response.data.researchers,
        })
      )
      .catch((err) => console.log(err));
  }

  const getResearchers = () => {
    axios
      .get("http://localhost:5000/researchers/")
      .then((Response) => {
        setAllResearchers(Response.data);
        console.log("element=" + Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getGroup(id);
  }, [id]);

  useEffect(() => {
    getResearchers();
  }, []);

  return (
    <main>
      <div>
        <img
          className="top-img card-img-top"
          src={group.picture}
          alt="Card cap"
        />
      </div>
      <div className="row">
        <h1 className="group-title">Details about {group.title} group </h1>
        <p className="group-description col-12">{group.description}</p>
      </div>

      <div className="row">
        <h2>Researchers in {group.title} group</h2>

        {groupResearchers.map((researcher, id) => (
          <div key={id} className="card col-12 col-sm-4">
            <img
              className="card-img-top"
              src={researcher.picture}
              alt="Card cap"
            />
            <p>
              <Link
                className="btn btn-success"
                to={"/showResearcher/" + researcher._id}
              >
                {researcher.first_name} {researcher.last_name}
              </Link>
            </p>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          <Link to="/groups"> Back to group list </Link>
        </div>
      </div>
    </main>
  );
};

export default ShowGroup;
