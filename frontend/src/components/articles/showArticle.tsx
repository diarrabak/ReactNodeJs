import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
//Component used to display the selected researcher

const ShowArticle= ()=> {
 
  const [article, setArticle]=useState({
    title: "",
    authors: "",
    abstract: "",
    tags: "",
    file: "",
    journal: "",
    year: "",
    researchers:[''],
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

    return (
      <main>
       
        <div className="row">
          <h1 className="researcher-title">Details about {article.title} {' '} article </h1>
          <p className="group-description col-12">{article.abstract}</p>
          <p className="group-description col-12">{article.year} {' '} {article.journal}</p>
          <p className="group-description col-12">{articleAuthors}</p>
          <p className="group-description col-12">{article.tags}</p>
          <p> <Link to={article.file!=="" ? article.file:"#"} download> Download</Link> </p>
        </div>

        <div className="row">
          <h2>Local contributors to this paper</h2>
          {/*List of group from the state variable*/}
          {articleAuthors.map((author, id) => (
            <div key={id}
              className="card col-12 col-sm-4"
            >
              <img
                className="card-img-top"
                src={author.picture}
                alt="Card cap"
              />
              <p>
                <Link
                  className="btn btn-success"
                  to={"/showResearcher/" + author._id}
                >
                  {author.first_name} {' '} {author.last_name}
              
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
}

export default ShowArticle;
