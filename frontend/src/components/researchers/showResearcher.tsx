import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link,useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { getResearcher, setResearcher } from "../../store/reducers/researcherReducer";
import { getArticles, setArticles } from "../../store/reducers/articleReducer";
import { useSelector } from "react-redux";
//Component used to display the selected researcher

function ShowResearcher() {
  const {id}:any=useParams();
  const dispatch=useDispatch();
  const articles:any[]=useSelector((state:any)=>state.articles.allArticles);
  const researcher:any=useSelector((state:any)=>state.researchers.currentResearcher);
  const [groups, setGroups] = useState<any[]>([]);
  // const [articles, setArticles] = useState<any[]>([]);
  const researcherGroups = groups.filter((group) =>researcher?.groups?.includes(group._id));
  const researcherArticles = articles.filter((article) =>
    researcher?.articles?.includes(article._id)
  );
  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  function getSingleResearcher(id: any) {
    dispatch(getResearcher(id))
      .then((Response:AxiosResponse) => dispatch(setResearcher(Response.data)))
      .catch((error:AxiosError) => console.log(error));
  }
  function getGroups() {
    axios
      .get("http://localhost:5000/groups/")
      .then((response) => setGroups(response.data))
      .catch((errors) => {
        console.log(errors);
      });
  }

  function getAllArticles() {
    dispatch(getArticles())
      .then((response:AxiosResponse) => setArticles(response.data))
      .catch((error:AxiosError) =>  console.log(error));
  }

  useEffect(() => {
    getSingleResearcher(id)
  }, [id]);


  useEffect(() => {
    getGroups();
    getAllArticles();
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
