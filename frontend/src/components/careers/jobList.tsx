import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleJob from "./singleJob";


//Main component of researcher feature
const JobList =()=> {
const [update, setUpdate]=useState(false);
 const [jobs, setJobs]=useState([]);
    
  //When the component is active on the DOM
 const getJobs=()=> {
    const url = "http://localhost:5000/jobs"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => setJobs(Response.data))
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(()=>{
    getJobs();
  },[update])
 

    return (
      <main>
        <h1> Job list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {jobs.map((job, id) => <SingleJob job={job} key={id} setUpdate={setUpdate}/>
            
        )}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addJob"> Add new job </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
}

export default JobList;
