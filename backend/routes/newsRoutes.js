import {
    //Import all our controllers
    addNews,
    getNews,
    getNewsById,
    updateNews,
    removeNews,
  } from "../controllers/newsControllers.js";
  
  const routes = (app) => {
    // Endpoint used on the server
    //to get all News or to post and save a New
    app
      .route("/news")
      // GET endpoint used on the server to get all News or to save a New
      .get(getNews)
  
      // POST endpoint
      .post(addNews);
  
    // Endpoint used for getting a News, update an New or delete an New
    app
      .route("/news/:NewId")
      // Get specific News
      .get(getNewsById)
  
      // update a specific News
      .put(updateNews)
  
      // update a specific News
      .delete(removeNews);
  };
  
  export default routes;
  