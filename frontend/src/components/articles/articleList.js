import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


//Main component of researcher feature
class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [], //List of all groups
      currentArticleId: "", //Selected group id
      currentArticle: {},
      id:'',
    };
    this.deleteArticle=this.deleteArticle.bind(this);
  }
  //When the component is active on the DOM
  componentDidMount() {
    const url = "http://localhost:5000/articles"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => {
        this.setState({
          articles: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setCurrentArticle(article, index) {
    this.setState({
      currentArticle: article,
      currentArticleId: index,
      id:article._id,
    });
  }

  deleteArticle() {
    const url = "http://localhost:5000/article/" + this.state.id ; //Url of the controller
    // Use of the get controllers through the axios API
    axios
      .delete(url);
      window.location.reload();
  }

  render() {
    const { articles } = this.state;
    return (
      <main>
        <h1> Article list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {articles.map((article, id) => (
            <div
              className="card col-12 col-md-4"
              onMouseEnter={() => this.setCurrentArticle(article, id)}
              key={id}
            >
              <div className="card-body">
                <h5 className="card-title"><Link to={"/showArticle/"+ this.state.id }>{article.title}</Link> </h5>
                <p className="card-text">{article.abstract}</p>
                <p> <Link to={article.file!=="" ? article.file:"#"} download> Download</Link> </p>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-danger"
                    onClick={this.deleteArticle}
                  >
                    Delete
                  </button>
                </div>

                <div className="col-6">
                  {/*Link to the page of updating a group */}
                  <Link className="btn btn-success" to={"/article/" + this.state.id }> Update </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addResearcher"> Add new researcher </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
  }
}

export default ArticleList;
