import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

function SingleGroup (props: any) {
  const { group } = props;
  const history = useHistory();

  function deleteGroup(id: any) {
    const url = "http://localhost:5000/group/" + id; //Url of the controller
    // Use of the get controllers through the axios API
    axios
      .delete(url)
      .then(() => history.push("/groups"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="card col-12 col-md-4">
      <img className="card-img-top" src={group.picture} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/showGroup/" + group._id}>{group.title} </Link>{" "}
        </h5>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            className="btn btn-danger"
            onClick={() => deleteGroup(group._id)}
          >
            Delete
          </button>
        </div>

        <div className="col-6">
          {/*Link to the page of updating a group */}
          <Link className="btn btn-success" to={"/group/" + group._id}>
            {" "}
            Update{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleGroup;
