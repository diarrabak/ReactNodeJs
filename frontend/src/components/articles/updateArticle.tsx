import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
//Component used to display the list of all the groups

const UpdateArticle=()=>{
  const history=useHistory();
  const [article, setArticle]=useState({
    title: "",
    authors: "",
    abstract: "",
    tags: "",
    file: "",
    journal: "",
    year: "",
    researchers: [''],
   });
    
   const [allResearchers, setAllResearchers]=useState<any[]>([]);

   const articleAuthors:any[]=allResearchers.filter((author:any)=>article.researchers.includes(author._id));

   const id=useParams();
   console.log(id)
  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  const getArticle=(id:any)=> {

    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/article/" + id)
      .then((Response) => 
       setArticle({
          title: Response.data.title,
          authors: Response.data.authors,
          abstract: Response.data.abstract,
          tags: Response.data.tags,
          file: Response.data.file,
          journal: Response.data.journal,
          year: Response.data.year,
          researchers: Response.data.researchers,
        }))
      .catch((error) => {
        console.log(error);
      });
  }

 const getResearchers=()=>{
  axios
  .get("http://localhost:5000/researchers/")
  .then((Response) => {
    setAllResearchers(Response.data);
    console.log("element=" + Response.data);
  })
  .catch((error) => {
    console.log(error);
  });
}

useEffect(()=>{
  getArticle(id);
},[id])

useEffect(()=>{
  getResearchers();
},[])

  
   const submitArticle=(event:any)=> {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/articles/"+id, {
        title: article.title,
        authors: article.authors,
        abstract: article.abstract,
        tags: article.tags,
        file: article.file,
        journal: article.journal,
        year: article.year,
        researchers: article.researchers,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });
    history.push("/articles");
  }

  //Function to update the select value
  const onChange=(e:any) =>{
    const [name, value]=e.target;
    setArticle(prev=>({
     ...prev,
     [name]:value,
    }));
  }


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
              <FileBase
                type="file"
                multiple={false}
                onDone={(base64:any ) => setArticle(prev=>({ ...prev, file: base64 }))}
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
            <label
              className="form-label  col-12 col-sm-2"
              htmlFor="researchers"
            >
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
                {allResearchers.map((item) => (
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
}

export default UpdateArticle;
