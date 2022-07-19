import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
//Component used to display the selected researcher

class ShowResearcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name:"",
      last_name:"",
      email: "",
      picture: "",
      biography:"",
      researchgate: "",
      googlescholar: "",
      groups: [], //List of all users
      articles:[],
      researcherGroups: [],
      researcherArticles: [],
    };
  }

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/researcher/" + id)
      .then((Response) => {
        this.setState({
          username:Response.data.username,
          first_name:Response.data.first_name,
          last_name:Response.data.last_name,
          email: Response.data.email,
          picture: Response.data.picture,
          biography:Response.data.biography,
          researchgate: Response.data.researchgate,
          googlescholar: Response.data.googlescholar,
          groups: Response.data.groups,
          articles:Response.data.articles,
        });

        for (let i = 0; i < this.state.groups.length; i++) {
          console.log("RS= " + i);
          axios
            .get(
              "http://localhost:5000/group/" + this.state.groups[i]
            )
            .then((Res) => {
              this.setState({
                researcherGroups: [...this.state.researcherGroups, Res.data],
              });
              console.log("element=" + Response.data);
            });
        }

        for (let article of this.state.articles) {
          axios
            .get(
              "http://localhost:5000/article/" + article
            )
            .then((Resp) => {
              this.setState({
                researcherArticles: [...this.state.researcherArticles, Resp.data],
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
    const { username, first_name, last_name, email, picture,biography,researchgate,googlescholar,groups,articles, researcherGroups,researcherArticles } = this.state;

    return (
      <main>
        <div>
          <img className="researcher-img card-img-top" src={picture} alt="Card cap" />
        </div>
        <div className="row">
          <h1 className="researcher-title">Details about {first_name} {' '} {last_name} </h1>
          <p className="group-description col-12">{biography}</p>
          <div>{email}</div>
        </div>

        <div className="row">
          <h2>{first_name} {' '} {last_name}'s group</h2>
          {/*List of group from the state variable*/}
          {researcherGroups.map((group, id) => (
            <div key={id}
              className="card col-12 col-sm-4"
            >
              <img
                className="card-img-top"
                src={group.picture}
                alt="Card cap"
              />
              <p>
                <Link
                  className="btn btn-success"
                  to={"/showGroup/" + group._id}
                >
                  {group.title}
              
                </Link>
              </p>
            </div>
          ))}
        </div>

        <div className="row">
          <h2>{first_name} {' '} {last_name}'s articles</h2>
          <div>{googlescholar}</div>
          <div>{researchgate}</div>
          {/*List of group from the state variable*/}
          <ol className="list-group">
          {researcherArticles.map((article, id) => (
            <li key={id}
              className="card col-12 col-sm-4"
            >
             
                <Link
                  className="btn btn-success"
                  to={"/showArticle/" + article._id}
                >
                  {article.title}
              
                </Link>
            </li>
          ))}
          </ol>
          
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <Link to="/researchers"> Back to researchers list </Link>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(ShowResearcher);
