import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
//Component used to display the selected researcher

function ShowResearcher() {
  const {id}:any=useParams();
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
  const researcherGroups = groups.filter((group) =>
    researcher.groups.includes(group._id)
  );
  const researcherArticles = articles.filter((article) =>
    researcher.articles.includes(article._id)
  );
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

  return (
    <main>
      <div>
        <img
          className="researcher-img card-img-top"
          src={researcher.picture}
          alt="Card cap"
        />
      </div>
      <div className="row">
        <h1 className="researcher-title">
          Details about {researcher.first_name} {researcher.last_name}{" "}
        </h1>
        <p className="group-description col-12">{researcher.biography}</p>
        <div>{researcher.email}</div>
      </div>

      <div className="row">
        <h2>
          {researcher.first_name} {researcher.last_name}'s group
        </h2>
        {/*List of group from the state variable*/}
        {researcherGroups.map((group, id) => (
          <div key={id} className="card col-12 col-sm-4">
            <img className="card-img-top" src={group.picture} alt="Card cap" />
            <p>
              <Link className="btn btn-success" to={"/showGroup/" + group._id}>
                {group.title}
              </Link>
            </p>
          </div>
        ))}
      </div>

      <div className="row">
        <h2>
          {researcher.first_name} {researcher.last_name}'s articles
        </h2>
        <div>{researcher.googlescholar}</div>
        <div>{researcher.researchgate}</div>
        {/*List of group from the state variable*/}
        <ol className="list-group">
          {researcherArticles.map((article, id) => (
            <li key={id} className="card col-12 col-sm-4">
              <Link
                className="btn btn-success"
                to={"/showArticle/" + article._id}
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          <Link to="/researchers"> Back to researchers list </Link>
        </div>
      </div>
    </main>
  );
}

export default ShowResearcher;
