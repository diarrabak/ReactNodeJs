import {
    //Import all our controllers
    addJob,
    getJobs,
    getJobById,
    updateJob,
    removeJob,
  } from "../controllers/jobControllers.js";
  
  const routes = (app) => {
    // Endpoint used on the server
    //to get all Jobs or to post and save a Job
    app
      .route("/jobs")
      // GET endpoint used on the server to get all Jobs or to save a Job
      .get(getJobs)
  
      // POST endpoint
      .post(addJob);
  
    // Endpoint used for getting an Job, update an Job or delete an Job
    app
      .route("/job/:JobId")
      // Get specific Job
      .get(getJobById)
  
      // update a specific Job
      .put(updateJob)
  
      // update a specific Job
      .delete(removeJob);
  };
  
  export default routes;
  