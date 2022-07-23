import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import FileBase from "react-file-base64";
import { Link, useHistory } from "react-router-dom";
import getFileBase64 from "../../helpers/fileConversion";
import { getResearchers, setResearchers } from "../../store/reducers/researcherReducer";
import { useDispatch } from "react-redux";
import { createArticle } from "../../store/reducers/articleReducer";
import { useSelector } from "react-redux";
// This component is used to create a new researcher and save to the database
const CreateArticle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [article, setArticle] = useState({
    title: "",
    authors: "",
    abstract: "",
    tags: "",
    file: "",
    journal: "",
    year: "",
    researchers: [],
  });

  const allResearchers:any[]=useSelector((state:any)=>state.researchers.allResearchers)

  const submitArticle = (event: any) => {
    event.preventDefault();
   dispatch(createArticle(article))
    //Our controller endpoint to save data to the database
   
      .then((response:AxiosResponse) => {
        console.log(response);
        history.push("/articles");
      })
      //Error message in case saving does not work
      .catch((error:AxiosError) => {
        console.log(error);
      });
  };

  //Function to update the select value
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllResearchers=()=>{
    dispatch(getResearchers())
    .then((res:AxiosResponse)=>dispatch(setResearchers(res.data)))
    .catch((err:AxiosError)=>console.log("No reserachers", err))
  }
  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getFileBase64(files[0])
      .then((result) => setArticle((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    getAllResearchers();
  },[])
  //redirect function to be included so that we go back to researcher list each time a new researcher is added

  return (
    <main>
      <h1>Create a new article</h1>
      {/*Form used to fill the researcher component*/}
      <form onSubmit={submitArticle}>
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
              value={article.title}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="authors">
            Authors
          </label>
          <div className="col-12 col-sm-10">
            <textarea
              className="form-control"
              name="authors"
              id="authors"
              required
              value={article.authors}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="authors">
            Abstract
          </label>
          <div className="col-12 col-sm-10">
            <textarea
              className="form-control"
              name="abstract"
              id="abstract"
              required
              value={article.abstract}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="authors">
            Tags
          </label>
          <div className="col-12 col-sm-10">
            <textarea
              className="form-control"
              name="tags"
              id="tags"
              required
              value={article.tags}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="file">
            File
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="file"
              className="form-control"
              name="file"
              id="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="journal">
            Journal
          </label>
          <div className="col-12 col-sm-10">
            <textarea
              className="form-control"
              name="journal"
              id="journal"
              required
              value={article.journal}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="year">
            Year
          </label>
          <div className="col-12 col-sm-10">
            <input
              type="date"
              className="form-control"
              name="year"
              id="year"
              required
              value={article.year}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="form-label  col-12 col-sm-2" htmlFor="researchers">
            Researchers
          </label>
          <div className="col-12 col-sm-10">
            <select
              multiple={true}
              value={article.researchers}
              onChange={onChange}
              className="form-control"
              name="researchers"
            >
              <option value="">== Choose researchers == </option>
              {/*Capitalize the first letter*/}
              {allResearchers?.map((item: any) => (
                <option value={item._id} key={item._id}>
                  {item.first_name.charAt(0).toUpperCase() +
                    item.first_name.substring(1) +
                    " "}
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
            <div className="col-12 col-sm-6">
              <Link to="/articles"> Back to article list </Link>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateArticle;
