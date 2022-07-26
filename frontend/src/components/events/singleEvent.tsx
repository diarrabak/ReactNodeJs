import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../store/reducers/eventReducer";

function SingleEvent(props: any) {
  const { event, setRefresh } = props;
  const dispatch=useDispatch();
  const removeEvent = (id: any) => {
    dispatch(deleteEvent(id))
      .then(() => setRefresh(true))
      .catch((err:any) => console.log(err));
  };

  return (
    <div className="card col-12 col-md-4">
      <img className="card-img-top" src={event.picture} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/showEvent/" + event._id}>{event.title} </Link>{" "}
        </h5>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            className="btn btn-danger"
            onClick={() => removeEvent(event._id)}
          >
         <FaTrash/>
          </button>
        </div>

        <div className="col-6">
          {/*Link to the page of updating a group */}
          <Link className="btn btn-success" to={"/event/" + event._id}>
           <FaEdit/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleEvent;
