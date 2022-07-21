import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
//Component used to display the list of all the groups

function UpdateGroup() {
  const { id }: any = useParams();
  const history = useHistory();
  const [group, setGroup] = useState({
    title: "",
    description: "",
    picture: "",
    researchers: [""], //List of all users
  });

  const [allResearchers, setAllResearchers] = useState<any[]>([]);
  const groupResearchers: any[] = allResearchers.filter((author: any) =>
    group.researchers.includes(author._id)
  );

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  function getGroup(id: any) {
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/group/" + id)
      .then((Response) =>
        setGroup({
          title: Response.data.title,
          description: Response.data.description,
          picture: Response.data.picture,
          researchers: Response.data.researchers,
        })
      )
      .catch((err) => console.log(err));
  }

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
    getGroup(id);
  }, [id]);

  useEffect(() => {
    getResearchers();
  }, []);

  function submitGroup(event: any) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/groups/" + id, {
        title: group.title,
        description: group.description,
        picture: group.picture,
        researchers: group.researchers,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    history.push("/groups");
  }

  //Function to update the select value
  function onChange(e: any) {
    const { name, value } = e.target;
    setGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: any = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getBase64(files[0])
      .then((result) => setGroup((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <h1>Update a group </h1>
      <form onSubmit={submitGroup}>
        <div className="form-group row">
          <label className="form-label col-12 col-sm-2" htmlFor="title">
            Group title
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              required
              value={group.title}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="description">
            Group description
          </label>
          <div className="col-12 col-sm-10">
            <textarea
              className="form-control"
              name="description"
              id="description"
              required
              value={group.description}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="picture">
            Picture
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="file"
              className="form-control"
              name="picture"
              id="picture"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
        </div>

        {/*Since it is a many to many relationship, no need to include users and topics here*/}

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="researchers">
            Group researchers
          </label>
          <div className="col-12 col-sm-10">
            <select
              multiple={true}
              value={group.researchers}
              onChange={onChange}
              className="form-control"
              name="researchers"
            >
              <option value="">== Choose researchers == </option>
              {/*Capitalize the first letter*/}
              {allResearchers.map((item: any) => (
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
          </div>
          {/*Link back to group list*/}
          <div className="col-12 col-sm-6">
            <Link to="/groups"> Back to group list </Link>
          </div>
        </div>
      </form>
    </main>
  );
}

export default UpdateGroup;
