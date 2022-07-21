import React, { useEffect, useState } from "react";
import { Link,useHistory,useParams } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
//Component used to display the list of all the groups

const UpdateEvent=()=> {

  const id = useParams();
  const history=useHistory();
  const [labEvent,setlabEvent]=useState({
       title: "",
       description: "",
       picture: "",
       date: "",
       place: "",
       presenters:"",
  });
     
 
   //When the component is active on the DOM
   //The values pulled from database to fill the dropdown menu
   const getEvent=(id:any)=> {
     // Use of the get controllers through the axios API
     axios
       .get("http://localhost:5000/event/" + id)
       .then((Response) => 
         setlabEvent({
           title: Response.data.title,
           description: Response.data.description,
           picture: Response.data.picture,
           date: Response.data.date,
           place: Response.data.place,
           presenters: Response.data.presenters,
         }))
       .catch((error) => {
         console.log(error);
       });
   }
 
   useEffect(()=>{
  getEvent(id);
   },[id])
 
   const submitEvent=(event:any)=> {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/events/"+id, {
        title: labEvent.title,
        description: labEvent.description,
        picture: labEvent.picture,
        date: labEvent.date,
        place: labEvent.place,
        presenters: labEvent.presenters,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    history.push("/events");
  }

  //Function to update the select value

 const onChange=(e:any)=>{
  const [name, value]=e.target;
  setlabEvent((prev)=>(
    {...prev,
      [name]:value,
    }))
 }

    return (
      <main>
        <h1>Update event </h1>
        <form onSubmit={submitEvent}>
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
                value={labEvent.title}
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
                value={labEvent.description}
                onChange={onChange}
              ></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label className="form-label  col-12 col-sm-2" htmlFor="picture">
              Picture
            </label>
            <div className="col-12 col-sm-10">
              <FileBase
                type="file"
                multiple={false}
                onDone={(base64:any ) => setlabEvent(prev=>({ ...prev, picture: base64 }))}
              />
            </div>
          </div>

          <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="date">
                Date
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="date"
                  required
                  value={labEvent.date}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="place">
                Place
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="place"
                  className="form-control"
                  name="place"
                  id="place"
                  required
                  value={labEvent.place}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="presenters">
                Presenters
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="presenters"
                  className="form-control"
                  name="presenters"
                  id="presenters"
                  required
                  value={labEvent.presenters}
                  onChange={onChange}
                />
              </div>
            </div>


          <div className="row">
            <div className="offset-sm-2 col-12 col-sm-4">
              <input type="submit" className="btn btn-success" />
            </div>
            {/*Link back to group list*/}
            <div className="col-12 col-sm-6">
              <Link to="/events"> Back to events list </Link>
            </div>
          </div>
        </form>
      </main>
    );
}

export default UpdateEvent;
