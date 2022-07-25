import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import {Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
import getFileBase64 from "../../helpers/fileConversion";
//Component used to display the list of all the groups

const UpdateResearcher=()=> {
 
  const {id}:any=useParams();
  const history=useHistory();
  const [researcher, setResearcher] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    picture: "",
    biography: "",
    researchgate: "",
    googlescholar: "",
    roles: [""],
    groups: [""], //List of all users
    articles: [""],
  });
  const [groups, setGroups] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  // const researcherGroups = groups.filter((group) =>researcher.groups.includes(group._id));
  // const researcherArticles = articles.filter((article) => researcher.articles.includes(article._id));
  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  function getResearcher(id: any) {
    axios
      .get("http://localhost:5000/researcher/" + id)
      .then((Response) =>
        setResearcher({
          username: Response.data.username,
          first_name: Response.data.first_name,
          last_name: Response.data.last_name,
          email: Response.data.email,
          password: Response.data.password,
          picture: Response.data.picture,
          biography: Response.data.biography,
          researchgate: Response.data.researchgate,
          googlescholar: Response.data.googlescholar,
          roles: Response.data.roles,
          groups: Response.data.groups,
          articles: Response.data.articles,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }
  function getGroups() {
    axios
      .get("http://localhost:5000/groups/")
      .then((response) => setGroups(response.data))
      .catch((errors) => {
        console.log(errors);
      });
  }

  function getArticles() {
    axios
      .get("http://localhost:5000/articles/")
      .then((response) => setArticles(response.data))
      .catch((errors) => {
        console.log(errors);
      });
  }

  useEffect(() => {
    getResearcher(id)
  }, [id]);


  useEffect(() => {
    getGroups();
    getArticles();
  }, []);


  function submitResearcher(event: any) {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/researchers/"+id, {
        username: researcher.username,
        first_name: researcher.first_name,
        last_name: researcher.last_name,
        email: researcher.email,
        password: researcher.password,
        picture: researcher.picture,
        biography: researcher.biography,
        researchgate: researcher.researchgate,
        googlescholar: researcher.googlescholar,
        roles: researcher.roles,
        groups: researcher.groups,
        articles: researcher.articles,
      })
      .then((response) => {
        console.log(response);
        history.push("/researchers");
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
   
  }

  //Function to update the select value
  function onChange(e:any) {
    const {name, value} = e.target;
    setResearcher((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getFileBase64(files[0])
      .then((result) => setResearcher((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };


    return (
      <main>
        <h1>Update a researcher </h1>
        <form
            onSubmit={submitResearcher}
          >
            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="username">
                Username
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  required
                  value={researcher.username}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="first_name"
              >
                First name
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  id="first_name"
                  required
                  value={researcher.first_name}
                  onChange={onChange}
                />
              </div>
            </div>

            
            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="last_name"
              >
                Last name
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  id="last_name"
                  required
                  value={researcher.last_name}
                  onChange={onChange}
                />
              </div>
            </div>

            
            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="email"
              >
               Email
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  required
                  value={researcher.email}
                  onChange={onChange}
                />
              </div>
            </div>

            
            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  required
                  value={researcher.password}
                  onChange={onChange}
                />
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

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="biography"
              >
               Biography
              </label>
              <div className="col-12 col-sm-10">
              <textarea
                  className="form-control"
                  name="biography"
                  id="biography"
                  required
                  value={researcher.biography}
                  onChange={onChange}
                >
                </textarea>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="gate"
              >
               Researchgate
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="gate"
                  id="gate"
                  required
                  value={researcher.researchgate}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="scholar"
              >
               Google scholar
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="scholar"
                  id="scholar"
                  required
                  value={researcher.googlescholar}
                  onChange={onChange}
                />
              </div>
            </div>


            {/*Since it is a many to many relationship, no need to include users and topics here*/}

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="groups"
              >
                Groups
              </label>
              <div className="col-12 col-sm-10">
                <select
                  multiple={true}
                  value={researcher.groups}
                  onChange={onChange}
                  className="form-control"
                  name="groups"
                >
                  <option value="">== Choose groups == </option>
                  {/*Capitalize the first letter*/}
                  {groups.map((item:any) => (
                    <option value={item._id} key={item._id}>
                      {item.title.charAt(0).toUpperCase() +
                        item.title.substring(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="roles"
              >
                Roles
              </label>
              <div className="col-12 col-sm-10">
                <select
                  multiple={true}
                  value={researcher.roles}
                  onChange={onChange}
                  className="form-control"
                  name="roles"
                >
                  <option value="Researcher">Researcher</option>
                  <option value="Student">Student</option>
                  <option value="Admin">Admin </option>
                  <option value="Staff">staff</option>
                  
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="form-label  col-12 col-sm-2"
                htmlFor="articles"
              >
                Articles
              </label>
              <div className="col-12 col-sm-10">
                <select
                  multiple={true}
                  value={researcher.articles}
                  onChange={onChange}
                  className="form-control"
                  name="articles"
                >
                  <option value="">== Choose articles == </option>
                  {/*Capitalize the first letter*/}
                  {articles.map((item:any) => (
                    <option value={item._id} key={item._id}>
                      {item.title.charAt(0).toUpperCase() +
                        item.title.substring(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-2 col-12 col-sm-4">
                <input type="submit" className="btn btn-success" />
              </div>
              {/*Link back to researcher list*/}
              <div className="col-12 col-sm-6">
                <Link to="/researchers"> Back to researcher list </Link>
              </div>
            </div>
          </form>
      </main>
    );
}

export default  UpdateResearcher ;
