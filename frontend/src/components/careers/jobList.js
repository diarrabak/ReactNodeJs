import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


//Main component of researcher feature
class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [], //List of all groups
      currentJobId: "", //Selected group id
      currentJob: {},
      id:'',
    };
    this.deleteJob=this.deleteJob.bind(this);
  }
  //When the component is active on the DOM
  componentDidMount() {
    const url = "http://localhost:5000/jobs"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => {
        this.setState({
          jobs: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setCurrentJob(job, index) {
    this.setState({
      currentJob: job,
      currentJobId: index,
      id:job._id,
    });
  }

  deleteJob() {
    const url = "http://localhost:5000/job/" + this.state.id ; //Url of the controller
    // Use of the get controllers through the axios API
    axios
      .delete(url);
      window.location.reload();
  }

  render() {
    const { jobs } = this.state;
    return (
      <main>
        <h1> Job list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {jobs.map((job, id) => (
            <div
              className="card col-12 col-md-4"
              onMouseEnter={() => this.setCurrentJob(job, id)}
              key={id}
            >
              <div className="card-body">
                <h5 className="card-title"><Link to={"/showJob/"+ this.state.id }>{job.title}</Link> </h5>
                <p className="card-text">{job.description}</p>
                <p> <Link to={job.file!=="" ? job.file:"#"} download={job.title +".pdf"}> Download</Link> </p>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-danger"
                    onClick={this.deleteJob}
                  >
                    Delete
                  </button>
                </div>

                <div className="col-6">
                  {/*Link to the page of updating a group */}
                  <Link className="btn btn-success" to={"/job/" + this.state.id }> Update </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addJob"> Add new job </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
  }
}

export default JobList;
