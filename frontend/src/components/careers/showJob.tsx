import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
//Component used to display the selected researcher

const ShowJob =()=> {
  const {id}:any=useParams();
  const [job,setJob]=useState({
    title: "",
    description:"",
    jobtype: "",
    file: "",
    year: "",
    researchers: [''],
  });
   
  const [allResearchers, setAllResearchers]=useState<any[]>([]);
  const jobContacts:any[]=allResearchers.filter((author:any)=>job?.researchers.includes(author._id));
  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  const getJob=(id:any)=> {
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/job/" + id)
      .then((Response) => 
       setJob({
          title: Response.data.title,
          description: Response.data.description,
          jobtype: Response.data.jobtype,
          file: Response.data.file,
          year: Response.data.year,
          researchers: Response.data.researchers,
        })).catch((err)=>console.log(err));

      }

      const getResearchers=()=>{
        axios
        .get("http://localhost:5000/researchers/")
        .then((Response) => {
          setAllResearchers(Response.data);
          console.log("element=" + Response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
      useEffect(()=>{
        getJob(id);
      },[id])
      
      useEffect(()=>{
        getResearchers();
      },[])

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
