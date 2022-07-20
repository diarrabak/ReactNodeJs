import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SingleNews from "./singleNews";


//Main component of group feature
function NewsList() {
 const history=useHistory();
  const [news, setNews]=useState([]);
  
  //When the component is active on the DOM
  function getNews() {
    const url = "http://localhost:5000/news"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => setNews(Response.data))
      .catch((error) => {
        console.log(error);
      });
  }


 

    return (
      <main>
        <h1> News list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {news.map((info, id) => <SingleNews info={info} key={id} />
           
          )}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addNews"> Add news </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
}

export default NewsList;
