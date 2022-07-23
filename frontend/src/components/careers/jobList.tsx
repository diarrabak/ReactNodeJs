import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import SingleJob from "./singleJob";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, setJobs } from "../../store/reducers/jobReducer";
import ClipLoader from "react-spinners/ClipLoader";

//Main component of researcher feature
const JobList = () => {
  const [update, setUpdate] = useState(false);
  const jobs: any[] = useSelector((state: any) => state.jobs.allJobs);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //When the component is active on the DOM
  const getAllJobs = () => {
    setLoading(true);
    dispatch(getJobs())
      .then((Response: AxiosResponse) => {
        dispatch(setJobs(Response.data));
        setLoading(false);
      })
      .catch((error: AxiosError) => console.log(error));
  };

  useEffect(() => {
    getAllJobs();
  }, [update]);

  return (
    <main>
      <h1> Job list</h1>

      <div className="row">
        {/*List of group from the state variable*/}
        {loading ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ClipLoader color="blue" loading={loading} size={100} />
          </div>
        ) : (
          jobs.map((job, id) => (
            <SingleJob job={job} key={id} setUpdate={setUpdate} />
          ))
        )}
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
};

export default JobList;
