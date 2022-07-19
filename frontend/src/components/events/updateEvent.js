import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import FileBase from "react-file-base64";
//Component used to display the list of all the groups

class UpdateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "",
      date: "",
      place: "",
      presenters:"",
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePlace = this.onChangePlace.bind(this);
    this.onChangePresenters = this.onChangePresenters.bind(this);
  }

  //When the component is active on the DOM
  //The values pulled from database to fill the dropdown menu
  componentDidMount() {
    const id = this.props.match.params.id;
    // const { match: { params } } = this.props;
    //console.log("Params= "+ id);
    // Use of the get controllers through the axios API
    axios
      .get("http://localhost:5000/event/" + id)
      .then((Response) => {
        this.setState({
          title: Response.data.title,
          description: Response.data.description,
          picture: Response.data.picture,
          date: Response.data.date,
          place: Response.data.place,
          presenters: Response.data.presenters,
        });
        //console.log('element='+this.state.currentgroup);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Function to update the select value
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePicture(e) {
    this.setState({
      picture: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onChangePlace(e) {
    this.setState({
      place: e.target.value,
    });
  }

  onChangePresenters(e) {
    this.setState({
      presenters: e.target.value,
    });
  }

  submitEvent(event) {
    const id = this.props.match.params.id;
    event.preventDefault();
    //Our controller endpoint to save data to the database
    axios
      .put("http://localhost:5000/event/" + id, {
        title: this.state.title,
        description: this.state.description,
        picture: this.state.picture,
        date: this.state.date,
        place: this.state.place,
        presenters: this.state.presenters,
      })
      .then((response) => {
        console.log(response);
      })
      //Error message in case saving does not work
      .catch((error) => {
        console.log(error);
      });

    this.props.history.push("/events");
  }

  render() {
    const { title, description, picture, date, place, presenters } = this.state;

    return (
      <main>
        <h1>Update event </h1>
        <form onSubmit={this.submitEvent.bind(this)}>
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
                value={title}
                onChange={this.onChangeTitle}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              className="form-label  col-12 col-sm-2"
              htmlFor="description"
            >
              Description
            </label>
            <div className="col-12 col-sm-10">
              <textarea
                className="form-control"
                name="description"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
              ></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label className="form-label  col-12 col-sm-2" htmlFor="picture">
              Picture
            </label>
            <div className="col-12 col-sm-10">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => this.setState({ picture: base64 })}
              />
            </div>
          </div>

          <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="date">
                Date
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="date"
                  required
                  value={date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="place">
                Place
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="place"
                  className="form-control"
                  name="place"
                  id="place"
                  required
                  value={place}
                  onChange={this.onChangePlace}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="form-label col-12 col-sm-2" htmlFor="presenters">
                Presenters
              </label>
              <div className="col-12 col-sm-10">
                <input
                  type="presenters"
                  className="form-control"
                  name="presenters"
                  id="presenters"
                  required
                  value={presenters}
                  onChange={this.onChangePresenters}
                />
              </div>
            </div>


          <div className="row">
            <div className="offset-sm-2 col-12 col-sm-4">
              <input type="submit" className="btn btn-success" />
            </div>
            {/*Link back to group list*/}
            <div className="col-12 col-sm-6">
              <Link to="/events"> Back to events list </Link>
            </div>
          </div>
        </form>
      </main>
    );
  }
}

export default withRouter(UpdateEvent);
