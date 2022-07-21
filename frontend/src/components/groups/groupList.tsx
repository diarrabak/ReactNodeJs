import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SingleGroup from "./singleGroup";


//Main component of group feature
function GroupList (){

  const [groups, setGroups]=useState([]);
  //When the component is active on the DOM
  function getGroups() {
    const url = "http://localhost:5000/groups"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => setGroups(Response.data))
      .catch((error) => {
        console.log(error);
      });
  }

 useEffect(()=>{
   getGroups();
 },[])

    return (
      <main>
        <h1> Group list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {groups.map((group, id) => <SingleGroup group={group} key={id} />
           
          )}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addGroup"> Add new group </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
}

export default GroupList;
