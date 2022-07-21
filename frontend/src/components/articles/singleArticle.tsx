import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


function SingleArticle(props:any) {
    const {article}=props;

    const deleteArticle=(id:any)=> {
        const url = "http://localhost:5000/article/" + article._id ; //Url of the controller
        // Use of the get controllers through the axios API
        axios
          .delete(url)
          .then(()=>{})
          .catch(err=>console.log(err))
         
      }

  return (
    <div
      className="card col-12 col-md-4"
    >
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/showArticle/" + article._id}>{article.title}</Link>{" "}
        </h5>
        <p className="card-text">{article.abstract}</p>
        <p>
          {" "}
          <Link to={article.file !== "" ? article.file : "#"} download>
            {" "}
            Download
          </Link>{" "}
        </p>
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger" onClick={()=>deleteArticle(article._id)}>
            Delete
          </button>
        </div>

        <div className="col-6">
          {/*Link to the page of updating a group */}
          <Link className="btn btn-success" to={"/article/" + article._id}>
            {" "}
            Update{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleArticle;
