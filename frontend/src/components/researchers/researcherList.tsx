import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SingleResearcher from "./singleResearcher";


//Main component of researcher feature
function ResearcherList() {
  const [allResearchers, setAllResearchers]=useState([]);
  
  //When the component is active on the DOM
  const getResearchers=()=>{
    axios
    .get("http://localhost:5000/researchers/")
    .then((Response) => {
      setAllResearchers(Response.data);
      console.log("element=" + Response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  useEffect(()=>{
    getResearchers();
  },[])
  

 

    return (
      <main>
        <h1> Researcher list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {allResearchers.map((researcher, id) => <SingleResearcher researcher={researcher} key={id} />
           
          )}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addResearcher"> Add new researcher </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
}

export default ResearcherList;
