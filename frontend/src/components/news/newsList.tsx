import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import SingleNews from "./singleNews";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { getInfos, setInfos } from "../../store/reducers/newsReducer";
import { useSelector } from "react-redux";

//Main component of group feature
function NewsList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const news: any[] = useSelector((state: any) => state.infos.allInfos);
  //When the component is active on the DOM
  function getNews() {
    dispatch(getInfos())
      .then((Response: AxiosResponse) => {
        dispatch(setInfos(Response.data));
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  useEffect(()=>{
    getNews()
  },[])
  return (
    <main>
      <h1> News list</h1>

      <div className="row">
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
          news.map((info, id) => <SingleNews info={info} key={id} />)
        )}
        {/*List of group from the state variable*/}
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          {/*Link to the page of new group creation. This must be created in routes in App component*/}
          <Link to="/addNews"> Add news </Link>
        </div>
        {/*Link to the page of group removal*/}
      </div>
    </main>
  );
}

export default NewsList;
