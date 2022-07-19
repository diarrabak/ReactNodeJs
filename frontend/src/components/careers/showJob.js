import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
//Component used to display the selected researcher

class ShowJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description:"",
      jobtype: "",
      file: "",
      year: "",
      researchers: [],
      contactResearchers: [],
    };
  }

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("RS= " + id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/job/" + id)
      .then((Response) => {
        this.setState({
          title: Response.data.title,
          description: Response.data.description,
          jobtype: Response.data.jobtype,
          file: Response.data.file,
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
                contactResearchers: [...this.state.contactResearchers, Resp.data],
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
    const { title, description, jobtype, file, year, researchers, contactResearchers } = this.state;

    return (
      <main>
       
        <div className="row">
          <h1 className="researcher-title">Details about {title} {' '} position </h1>
          <p className="group-description col-12">{description}</p>
          <p className="group-description col-12">{jobtype}</p>
          <p className="group-description col-12">{year}</p>
          <p> <Link to={file!=="" ? file:"#"} download> Download</Link> </p>
        </div>

        <div className="row">
          <h2>Contact person</h2>
          {/*List of group from the state variable*/}
          {contactResearchers.map((researcher, id) => (
            <div key={id}
              className="card col-12 col-sm-4"
            >
              <img
                className="card-img-top"
                src={researcher.picture}
                alt="Card cap"
              />
              <p>
                <Link
                  className="btn btn-success"
                  to={"/showResearcher/" + researcher._id}
                >
                  {researcher.first_name} {' '} {researcher.last_name}
              
                </Link>
              </p>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <Link to="/careers"> Back to jobs list </Link>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(ShowJob);
