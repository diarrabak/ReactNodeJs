import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector,useDispatch } from "react-redux";
import { getArticle, setArticle } from "../../store/reducers/articleReducer";
import { getResearchers, setResearchers } from "../../store/reducers/researcherReducer";
//Component used to display the selected researcher

const ShowArticle = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const researchers = useSelector((state: any) => state.researchers.allResearchers);
  const article = useSelector((state: any) => state.articles.currentArticle);
  let articleAuthors: any[] = researchers?.filter((author: any) => article?.researchers?.includes(author._id));

  //The values pulled from database to fill the dropdown menu
  const getSingleArticle = (id: any) => {
    dispatch(getArticle(id))
      .then((Response: AxiosResponse) => dispatch(setArticle(Response.data)))
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSingleArticle(id);
  }, [id]);

  const getAllResearchers=()=>{
    dispatch(getResearchers())
    .then((res:AxiosResponse)=>dispatch(setResearchers(res.data)))
    .catch((err:AxiosError)=>console.log("No reserachers", err))
  }

  useEffect(()=>{
    getAllResearchers();
  },[])

  return (
    <main>
      <div className="row">
        <h1 className="researcher-title">
          Details about {article.title} article{" "}
        </h1>
        <p className="group-description col-12">{article.abstract}</p>
        <p className="group-description col-12">
          {article.year} {article.journal}
        </p>
        <p className="group-description col-12">{article.authors}</p>
        <p className="group-description col-12">{article.tags}</p>
        <p>
          {" "}
          <Link to={article.file !== "" ? article.file : "#"} download>
            {" "}
            Download
          </Link>{" "}
        </p>
      </div>

      <div className="row">
        <h2>Local contributors to this paper</h2>
        {/*List of group from the state variable*/}
        {articleAuthors?.map((author, id) => (
          <div key={id} className="card col-12 col-sm-4">
            <img className="card-img-top" src={author.picture} alt="Card cap" />
            <p>
              <Link
                className="btn btn-success"
                to={"/showResearcher/" + author._id}
              >
                {author.first_name} {author.last_name}
              </Link>
            </p>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          <Link to="/articles"> Back to articles list </Link>
        </div>
      </div>
    </main>
  );
};

export default ShowArticle;
