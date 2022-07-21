import axios from 'axios';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';

function SingleJob(props:any) {
    
    const {job, setUpdate}=props;
    const history=useHistory();
    const deleteJob=(id:any)=> {
        const url = "http://localhost:5000/job/" + id ; //Url of the controller
        // Use of the get controllers through the axios API
        axios
          .delete(url)
          .then(()=> {
            setUpdate(true); 
            history.push("/careers");
          })
          .catch((err)=>console.log(err));
      }

  return (
    <div
    className="card col-12 col-md-4"
  >
    <div className="card-body">
      <h5 className="card-title"><Link to={"/showJob/"+ job._id }>{job.title}</Link> </h5>
      <p className="card-text">{job.description}</p>
      <p> <Link to={job.file!=="" ? job.file:"#"} download={job.title +".pdf"}> Download</Link> </p>
    </div>
    <div className="row">
      <div className="col-6">
        <button
          className="btn btn-danger"
          onClick={()=>deleteJob(job._id)}
        >
          Delete
        </button>
      </div>

      <div className="col-6">
        {/*Link to the page of updating a group */}
        <Link className="btn btn-success" to={"/job/" +job._id }> Update </Link>
      </div>
    </div>
  </div>
  )
}

export default SingleJob