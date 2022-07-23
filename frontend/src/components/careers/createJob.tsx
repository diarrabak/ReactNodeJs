import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useHistory } from "react-router-dom";
import getFileBase64 from "../../helpers/fileConversion";
import { getResearchers, setResearchers } from "../../store/reducers/researcherReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createJob } from "../../store/reducers/jobReducer";
// This component is used to create a new researcher and save to the database
const CreateJob = () => {
  const history = useHistory();
  const dispatch=useDispatch();
  const [job, setJob] = useState({
    title: "",
    description: "",
    jobtype: "",
    file: "",
    year: "",
    researchers: [""],
  });
 const allResearchers:any[]=useSelector((state:any)=>state.researchers.allResearchers)

  const submitJob = (event: any) => {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    dispatch(createJob(job))
      .then((response:AxiosResponse) => {
        console.log(response);
        history.push("/careers");
      })
      //Error message in case saving does not work
      .catch((error:AxiosError) => {
        console.log(error);
      });
   
  };

  //Function to update the select value
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllResearchers=()=>{
    dispatch(getResearchers())
    .then((res:AxiosResponse)=>dispatch(setResearchers(res.data)))
    .catch((err:AxiosError)=>console.log("No reserachers", err))
  }

  useEffect(() => {
    getAllResearchers();
  }, []);


  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getFileBase64(files[0])
      .then((result) => setJob((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };

  //redirect function to be included so that we go back to researcher list each time a new researcher is added
  return (
      <main>
        <h1>Create a new job</h1>
        {/*Form used to fill the researcher component*/}
        <form onSubmit={submitJob}>
          <div className="form-group row">
            <label className="form-label col-12 col-sm-2" htmlFor="title">
              Title
            </label>
            <div className="col-12 col-sm-10">
              <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                required
                value={job.title}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              className="form-label  col-12 col-sm-2"
              htmlFor="description"
            >
              Description
            </label>
            <div className="col-12 col-sm-10">
              <textarea
                className="form-control"
                name="description"
                id="description"
                required
                value={job.description}
                onChange={onChange}
              ></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label className="form-label  col-12 col-sm-2" htmlFor="jobtype">
              Jobtype
            </label>
            <div className="col-12 col-sm-10">
              <select
                multiple={false}
                value={job.jobtype}
                onChange={onChange}
                className="form-control"
                name="jobtype"
              >
                <option value="PhD">PhD</option>
                <option value="Internship">Internship</option>
                <option value="Other positions">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label className="form-label  col-12 col-sm-2" htmlFor="file">
              File
            </label>
            <div className="col-12 col-sm-10">
              <input
                type="file"
                className="form-control"
                name="file"
                id="file"
                accept="image/*"
                onChange={onFileChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="form-label  col-12 col-sm-2" htmlFor="year">
              Year
            </label>
            <div className="col-12 col-sm-10">
              <input
                type="date"
                className="form-control"
                name="year"
                id="year"
                required
                value={job.year}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              className="form-label  col-12 col-sm-2"
              htmlFor="researchers"
            >
              Contact researchers
            </label>
            <div className="col-12 col-sm-10">
              <select
                multiple={true}
                value={job.researchers}
                onChange={onChange}
                className="form-control"
                name="researchers"
              >
                <option value="">== Choose researchers == </option>
                {/*Capitalize the first letter*/}
                {allResearchers.map((item: any) => (
                  <option value={item._id} key={item._id}>
                    {item.first_name.charAt(0).toUpperCase() + item.first_name.substring(1) +" "}
                    {item.last_name.charAt(0).toUpperCase() + item.last_name.substring(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="offset-sm-2 col-12 col-sm-4">
              <input type="submit" className="btn btn-success" />
              {/*} <SubmitButton />*/}
              {/* onClick={(event) => (window.location.href = "/group")}*/}
            </div>
            {/*Link back to group list*/}
            <div className="col-12 col-sm-6">
              <Link to="/careers"> Back to jobs list </Link>
            </div>
          </div>
        </form>
      </main>
  );
};

export default CreateJob;
