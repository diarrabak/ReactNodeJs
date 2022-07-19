import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
//Component used to display the list of all the groups

class ShowNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "",
     date:"",
    };
  }

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/news/" + id)
      .then((Response) => {
        this.setState({
          title: Response.data.title,
          description: Response.data.description,
          picture: Response.data.picture,
          date: Response.data.date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { title, description, picture, date } = this.state;

    return (
      <main>
        <div>
          <img className="top-img card-img-top" src={picture} alt="Card cap" />
        </div>
        <div className="row">
          <h1 >Details about {title} </h1>
          <p className="group-description col-12">{description}</p>
          <p className="col-12">published on {date}</p>
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <Link to="/news"> Back to news list </Link>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(ShowNews);
