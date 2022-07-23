import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import SingleArticle from "./singleArticle";
import { useDispatch, useSelector } from "react-redux";
import { getArticles, setArticles } from "../../store/reducers/articleReducer";
import ClipLoader from "react-spinners/ClipLoader";

//Main component of researcher feature
const ArticleList = () => {
  const articles: any[] = useSelector(
    (state: any) => state.articles.allArticles
  );
 const [refresh, setRefresh]=useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading]=useState(false);
  const getAllArticles = () => {
    setLoading(true);
    dispatch(getArticles())
      .then((Response: AxiosResponse) => {dispatch(setArticles(Response.data)); setLoading(false);})
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllArticles();
  }, [refresh]);

  return (
    <main>
      <h1> Article list</h1>

      <div className="row">
        {/*List of group from the state variable*/}
        {loading ? (
          <div style={{flex:1, display:"flex", justifyContent:"center", alignItems:"center"}}>
             <ClipLoader color="blue" loading={loading} size={100} />
          </div>
         
        ):(
          articles?.map((article, id) => (
            <SingleArticle article={article} setRefresh={setRefresh} key={id} />
          ))
        )
          }
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          {/*Link to the page of new group creation. This must be created in routes in App component*/}
          <Link to="/addArticle"> Add new article </Link>
        </div>
        {/*Link to the page of group removal*/}
      </div>
    </main>
  );
};

export default ArticleList;
