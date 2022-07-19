import {
    //Import all our controllers
    addEvent,
    getEvents,
    getEventById,
    updateEvent,
    removeEvent,
  } from "../controllers/eventControllers.js";
  
  const routes = (app) => {
    // Endpoint used on the server
    //to get all Events or to post and save a Event
    app
      .route("/events")
      // GET endpoint used on the server to get all Events or to save a Event
      .get(getEvents)
  
      // POST endpoint
      .post(addEvent);
  
    // Endpoint used for getting an Event, update an Event or delete an Event
    app
      .route("/event/:EventId")
      // Get specific Event
      .get(getEventById)
  
      // update a specific Event
      .put(updateEvent)
  
      // update a specific Event
      .delete(removeEvent);
  };
  
  export default routes;
  