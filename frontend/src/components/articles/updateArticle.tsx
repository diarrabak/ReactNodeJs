import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link, useParams, useHistory } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import FileBase from "react-file-base64";
import getFileBase64 from "../../helpers/fileConversion";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createArticle, getArticle, updateArticle } from "../../store/reducers/articleReducer";
import { getResearchers, setResearchers } from "../../store/reducers/researcherReducer";
//Component used to display the list of all the groups

const UpdateArticle = () => {
  const history = useHistory();
  const dispatch=useDispatch();
  const researchers:any[]=useSelector((state:any)=>state.researchers.allResearchers);
  const [article, setArticle] = useState({
    title: "",
    authors: "",
    abstract: "",
    tags: "",
    file: "",
    journal: "",
    year: "",
    researchers: [""],
  });

  const { id }: any = useParams();
  console.log(id);
  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  const getSingleArticle = (id: any) => {
    dispatch(getArticle(id))
      .then((Response:AxiosResponse) =>setArticle({ ...Response.data}))
      .catch((error:AxiosError) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSingleArticle(id);
  }, [id]);


  const submitArticle = (event: any) => {
    event.preventDefault();
 dispatch(updateArticle(id, article))
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

  const onFileChange = (e: any) => {
    const { name, files } = e.target;
    getFileBase64(files[0])
      .then((result) => setArticle((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllResearchers=()=>{
    dispatch(getResearchers())
    .then((res:AxiosResponse)=>dispatch(setResearchers(res.data)))
    .catch((err:AxiosError)=>console.log("No reserachers", err))
  }

  useEffect(()=>{
    getAllResearchers();
  },[])


  //Function to update the select value
  return (
    <main>
      <h1>Update an article </h1>
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
              {researchers?.map((item) => (
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
            {/*} <SubmitButton />*/}
            {/* onClick={(event) => (window.location.href = "/group")}*/}
          </div>
          {/*Link back to group list*/}
          <div className="col-12 col-sm-6">
            <Link to="/articles"> Back to article list </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default UpdateArticle;
