import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

function SingleResearcher(props: any) {
  const history=useHistory();
    const {researcher}=props;
    function deleteResearcher(id:any) {
        const url = "http://localhost:5000/researcher/" + id ; //Url of the controller
        // Use of the get controllers through the axios API
        axios
          .delete(url)
          .then(()=>history.push("/researchers"))
          .catch((err)=>console.log(err))
          
      }
  return (
    <div
      className="card col-12 col-md-4"
    >
      <img className="card-img-top" src={researcher.picture} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/showResearcher/" + researcher._id}>
            {researcher.first_name} {researcher.last_name}
          </Link>{" "}
        </h5>
        <p className="card-text">{researcher.biography}</p>
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger" onClick={()=>deleteResearcher(researcher._id)}>
            Delete
          </button>
        </div>

        <div className="col-6">
          {/*Link to the page of updating a group */}
          <Link className="btn btn-success" to={"/researcher/" + researcher._id}>
            {" "}
            Update{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleResearcher;
