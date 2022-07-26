import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

function SingleNews(props: any) {
  const { info } = props;
  const history = useHistory();
  function deleteNews(id: any) {
    const url = "http://localhost:5000/news/" + id; //Url of the controller
    // Use of the get controllers through the axios API
    axios
      .delete(url)
      .then(() => history.push("/news"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="card col-12 col-md-4">
      <img className="card-img-top" src={info.picture} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/showNews/" + info._id}>{info.title} </Link>{" "}
        </h5>
        <p className="card-text">{info.description}</p>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <button
            className="btn btn-danger"
            onClick={() => deleteNews(info._id)}
          >
           <FaTrash/>
          </button>
        </div>

        <div className="col-12 col-md-6">
          {/*Link to the page of updating a group */}
          <Link className="btn btn-success" to={"/news/" + info._id}>
            {" "}
           <FaEdit/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleNews;
