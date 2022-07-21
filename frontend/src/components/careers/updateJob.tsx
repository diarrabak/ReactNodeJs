import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
import getFileBase64 from "../../helpers/fileConversion";
//Component used to display the list of all the groups

const UpdateJob = () => {
  const history = useHistory();
  const [job, setJob] = useState({
    title: "",
    description: "",
    jobtype: "",
    file: "",
    year: "",
    researchers: [""],
  });

  const { id }: any = useParams();

  const [allResearchers, setAllResearchers] = useState<any[]>([]);
  const jobContacts: any[] = allResearchers?.filter((author: any) =>
    job?.researchers.includes(author._id)
  );
  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  const getJob = (id: any) => {
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
        })
      )
      .catch((err) => console.log(err));
  };

  //Function to update the select value
  const submitJob = (event: any) => {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/jobs/" + id, {
        title: job.title,
        description: job.description,
        jobtype: job.jobtype,
        file: job.file,
        year: job.year,
        researchers: job.researchers,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    history.push("/careers");
  };

  //Function to update the select value
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getResearchers = () => {
    axios
      .get("http://localhost:5000/researchers/")
      .then((Response) => {
        setAllResearchers(Response.data);
        console.log("element=" + Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getJob(id);
  }, [id]);

  useEffect(() => {
    getResearchers();
  }, []);

  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getFileBase64(files[0])
      .then((result) => setJob((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <h1>Update a job </h1>
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
          <label className="form-label  col-12 col-sm-2" htmlFor="description">
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
          <label className="form-label  col-12 col-sm-2" htmlFor="researchers">
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
              {allResearchers?.map((item: any) => (
                <option value={item._id} key={item._id}>
                  {item.first_name.charAt(0).toUpperCase() +
                    item.first_name.substring(1)}
                  {item.last_name.charAt(0).toUpperCase() +
                    item.last_name.substring(1)}
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

export default UpdateJob;
