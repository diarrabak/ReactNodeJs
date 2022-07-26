import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import SingleGroup from "./singleGroup";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, setGroups } from "../../store/reducers/groupReducer";
import { FaPlusCircle } from "react-icons/fa";

//Main component of group feature
function GroupList (){

  // const [groups, setGroups]=useState([]);
  const dispatch=useDispatch();
  const groups:any[]=useSelector((state:any)=>state.groups.allGroups);
  const [loading, setLoading]=useState(false);
  //When the component is active on the DOM
  function getAllGroups() {
    setLoading(true);
   dispatch(getGroups())
      .then((Response:AxiosResponse) => {dispatch(setGroups(Response.data)); setLoading(false);})
      .catch((error:AxiosError) => {
        console.log(error);
      });
  }

 useEffect(()=>{
  getAllGroups();
 },[])

    return (
      <main>
        <h1> Group list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {loading ? (
          <div style={{flex:1, display:"flex", justifyContent:"center", alignItems:"center"}}>
             <ClipLoader color="blue" loading={loading} size={100} />
          </div>
        ):(
          groups.map((group, id) => <SingleGroup group={group} key={id} />
           
          )
        )}
        </div>

        <div className="row">
          <div className="col-12 pt-3">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link className="btn btn-primary" to="/addGroup"> <FaPlusCircle /> </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
}

export default GroupList;
