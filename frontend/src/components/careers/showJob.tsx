import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link,useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { getResearchers, setResearchers } from "../../store/reducers/researcherReducer";
import { getJob, setJob } from "../../store/reducers/jobReducer";
import { useSelector } from "react-redux";
//Component used to display the selected researcher

const ShowJob =()=> {
  const {id}:any=useParams();
  const dispatch=useDispatch();

   
  const allResearchers:any[]=useSelector((state:any)=>state.researchers.allResearchers);
  const job=useSelector((state:any)=>state.jobs.currentJob);
  const jobContacts:any[]=allResearchers?.filter((author:any)=>job?.researchers.includes(author._id));
  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  const getSingleJob=(id:any)=> {
    dispatch(getJob(id))
      .then((Response:AxiosResponse) => dispatch(setJob(Response.data)))
      .catch((err:AxiosError)=>console.log(err));

      }

      useEffect(()=>{
        getSingleJob(id);
      },[id])
      
      const getAllResearchers=()=>{
        dispatch(getResearchers())
        .then((res:AxiosResponse)=>dispatch(setResearchers(res.data)))
        .catch((err:AxiosError)=>console.log("No reserachers", err))
      }
    
      useEffect(() => {
        getAllResearchers();
      }, []);

    return (
      <main>
       
        <div className="row">
          <h1 className="researcher-title">Details about {job.title} {' '} position </h1>
          <p className="group-description col-12">{job.description}</p>
          <p className="group-description col-12">{job.jobtype}</p>
          <p className="group-description col-12">{job.year}</p>
          <p> <Link to={job.file!=="" ? job.file:"#"} download> Download</Link> </p>
        </div>

        <div className="row">
          <h2>Contact person</h2>
          {/*List of group from the state variable*/}
          {jobContacts?.map((researcher, id) => (
            <div key={id}
              className="card col-12 col-sm-4"
            >
              <img
                className="card-img-top"
                src={researcher.picture}
                alt="Card cap"
              />
              <p>
                <Link
                  className="btn btn-success"
                  to={"/showResearcher/" + researcher._id}
                >
                  {researcher.first_name} {' '} {researcher.last_name}
              
                </Link>
              </p>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <Link to="/careers"> Back to jobs list </Link>
          </div>
        </div>
      </main>
    );
}

export default ShowJob;
