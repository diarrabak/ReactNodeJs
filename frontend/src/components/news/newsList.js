import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


//Main component of group feature
class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [], //List of all groups
      currentNewsId: "", //Selected group id
      currentNews: {},
      id:'',
    };
    this.deleteNews=this.deleteNews.bind(this);
  }
  //When the component is active on the DOM
  componentDidMount() {
    const url = "http://localhost:5000/news"; //Url of the controller

    // Use of the get controllers through the axios API
    axios
      .get(url)
      .then((Response) => {
        this.setState({
          news: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setCurrentNews(news, index) {
    this.setState({
      currentNews: news,
      currentNewsId: index,
      id:news._id,
    });
  }

  deleteNews() {
    const url = "http://localhost:5000/news/" + this.state.id ; //Url of the controller
    // Use of the get controllers through the axios API
    axios
      .delete(url);
      window.location.reload();
  }

  render() {
    const { news } = this.state;
    return (
      <main>
        <h1> News list</h1>

        <div className="row">
          {/*List of group from the state variable*/}
          {news.map((info, id) => (
            <div
              className="card col-12 col-md-4"
              onMouseEnter={() => this.setCurrentNews(info, id)}
              key={id}
            >
              <img
                className="card-img-top"
                src={info.picture}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title"><Link to={"/showNews/"+ this.state.id }>{info.title} </Link> </h5>
                <p className="card-text">{info.description}</p>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <button
                    className="btn btn-danger"
                    onClick={this.deleteNews}
                  >
                    Delete
                  </button>
                </div>

                <div className="col-12 col-md-6">
                  {/*Link to the page of updating a group */}
                  <Link className="btn btn-success" to={"/news/" + this.state.id }> Update </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            {/*Link to the page of new group creation. This must be created in routes in App component*/}
            <Link to="/addNews"> Add news </Link>
          </div>
          {/*Link to the page of group removal*/}
        </div>
      </main>
    );
  }
}

export default NewsList;
