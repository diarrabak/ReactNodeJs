import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleArticle from "./singleArticle";



//Main component of researcher feature
const ArticleList=()=>{
 
  const [articles,setArticles]=useState([]);
   
  //When the component is active on the DOM
 const getArticles=()=>{
    const url = "http://localhost:5000/articles"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => setArticles(Response.data))
        .catch((error) => {
        console.log(error);
      });
  }

 useEffect(()=>{
  getArticles();
 },[])

    return (
      <main>
        <h1> Article list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {articles.map((article, id) => <SingleArticle article={article} key={id} />
           
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

export default ArticleList;
