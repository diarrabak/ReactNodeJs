import React, { useEffect, useState } from "react";
import axios from "axios";
import FileBase from "react-file-base64";
import { Link, useHistory } from "react-router-dom";

// This component is used to create a new researcher and save to the database
const CreateArticle = () => {
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

  const [allResearchers, setAllResearchers] = useState([]);

  const submitArticle = (event: any) => {
    event.preventDefault();

    //Our controller endpoint to save data to the database
    axios
      .post("http://localhost:5000/articles", {
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
  };

  //Function to update the select value
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    getResearchers();
  }, []);

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
      .then((result) => setArticle((prev) => ({ ...prev, [name]: result })))
      .catch((err) => {
        console.log(err);
      });
  };
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