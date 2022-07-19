import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
//Component used to display the selected researcher

class ShowArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      authors: "",
      abstract: "",
      tags: "",
      file: "",
      journal: "",
      year: "",
      researchers: [],
      articleAuthors:[],
    };
  }

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/article/" + id)
      .then((Response) => {
        this.setState({
          title: Response.data.title,
          authors: Response.data.authors,
          abstract: Response.data.abstract,
          tags: Response.data.tags,
          file: Response.data.file,
          journal: Response.data.journal,
          year: Response.data.year,
          researchers: Response.data.researchers,
        });

        for (let researcher of this.state.researchers) {
          axios
            .get(
              "http://localhost:5000/researcher/" + researcher
            )
            .then((Resp) => {
              this.setState({
                articleAuthors: [...this.state.articleAuthors, Resp.data],
              });
              console.log("element=" + Resp.data);
            });
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { title, authors, abstract, tags, file, journal, year, researchers, articleAuthors } = this.state;

    return (
      <main>
       
        <div className="row">
          <h1 className="researcher-title">Details about {title} {' '} article </h1>
          <p className="group-description col-12">{abstract}</p>
          <p className="group-description col-12">{year} {' '} {journal}</p>
          <p className="group-description col-12">{authors}</p>
          <p className="group-description col-12">{tags}</p>
          <p> <Link to={file!=="" ? file:"#"} download> Download</Link> </p>
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
}

export default withRouter(ShowArticle);
