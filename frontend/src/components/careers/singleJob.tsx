import axios, { AxiosError } from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteJob } from "../../store/reducers/jobReducer";

function SingleJob(props: any) {
  const { job, setUpdate } = props;
  const dispatch = useDispatch();
  const removeJob = (id: any) => {
    // Use of the get controllers through the axios API
    dispatch(deleteJob(id))
      .then(() => setUpdate(true))
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <div className="card col-12 col-md-4">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/showJob/" + job._id}>{job.title}</Link>{" "}
        </h5>
        <p className="card-text">{job.description}</p>
        <p>
          {" "}
          <Link
            to={job.file !== "" ? job.file : "#"}
            download={job.title + ".pdf"}
          >
            {" "}
            Download
          </Link>{" "}
        </p>
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger" onClick={() => removeJob(job._id)}>
           <FaTrash/>
          </button>
        </div>

        <div className="col-6">
          {/*Link to the page of updating a group */}
          <Link className="btn btn-success" to={"/job/" + job._id}>
            {" "}
           <FaEdit/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleJob;
