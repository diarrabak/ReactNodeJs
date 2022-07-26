import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteArticle } from "../../store/reducers/articleReducer";
import {FaDownload, FaTrash, FaEdit} from "react-icons/fa"; 

function SingleArticle(props:any) {
    const {article, setRefresh}=props;
    const dispatch=useDispatch();

    const removeArticle=(id:any)=> {
          dispatch(deleteArticle(id))
          .then(()=>setRefresh(true))
          .catch((err:any)=>console.log(err))
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
            <FaDownload />
          </Link>{" "}
        </p>
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger" onClick={()=>removeArticle(article._id)}>
            <FaTrash />
          </button>
        </div>

        <div className="col-6">
          {/*Link to the page of updating a group */}
          <Link className="btn btn-success" to={"/article/" + article._id}>
            {" "}
           <FaEdit />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleArticle;
