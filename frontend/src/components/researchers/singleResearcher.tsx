import axios, { AxiosError } from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteResearcher } from "../../store/reducers/researcherReducer";

function SingleResearcher(props: any) {
  const history=useHistory();
  const dispatch=useDispatch();
    const {researcher, setRefresh}=props;
    function removeResearcher(id:any) {
        dispatch(deleteResearcher(id))
          .then(()=>setRefresh(true))
          .catch((err:AxiosError)=>console.log(err))
          
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
           <FaTrash/>
          </button>
        </div>

        <div className="col-6">
          {/*Link to the page of updating a group */}
          <Link className="btn btn-success" to={"/researcher/" + researcher._id}>
            {" "}
           <FaEdit/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleResearcher;
