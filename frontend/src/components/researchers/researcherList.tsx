import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SingleResearcher from "./singleResearcher";
import {
  getResearchers,
  setResearchers,
} from "../../store/reducers/researcherReducer";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

//Main component of researcher feature
function ResearcherList() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const allResearchers: any[] = useSelector(
    (state: any) => state.researchers.allResearchers
  );
  //When the component is active on the DOM
  const getAllResearchers = () => {
    setLoading(true);
    dispatch(getResearchers())
      .then((Response: any) => {
        dispatch(setResearchers(Response.data));
        setLoading(false);
      })
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    getAllResearchers();
  }, [refresh]);

  return (
    <main>
      <h1> Researcher list</h1>

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
          allResearchers.map((researcher, id) => (
            <SingleResearcher
              researcher={researcher}
              setRefresh={setRefresh}
              key={id}
            />
          ))
        )}
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          {/*Link to the page of new group creation. This must be created in routes in App component*/}
          <Link to="/addResearcher"> Add new researcher </Link>
        </div>
        {/*Link to the page of group removal*/}
      </div>
    </main>
  );
}

export default ResearcherList;
