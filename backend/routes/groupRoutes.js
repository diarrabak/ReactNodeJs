import {
    //Import all our controllers
    addGroup,
    getGroups,
    getGroupById,
    updateGroup,
    removeGroup,
  } from "../controllers/groupControllers.js";
  
  const routes = (app) => {
    // Endpoint used on the server
    //to get all Groups or to post and save a Group
    app
      .route("/groups")
      // GET endpoint used on the server to get all Groups or to save a Group
      .get(getGroups)
  
      // POST endpoint
      .post(addGroup);
  
    // Endpoint used for getting a Group, update a Group or delete a Group
    app
      .route("/group/:GroupId")
      // Get specific Group
      .get(getGroupById)
  
      // update a specific Group
      .put(updateGroup)
  
      // update a specific Group
      .delete(removeGroup);
  };
  
  export default routes;
  