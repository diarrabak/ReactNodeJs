import {
  //Import all our controllers
  addResearcher,
  getResearchers,
  getResearcherById,
  updateResearcher,
  removeResearcher,
} from "../controllers/researcherControllers.js";

const routes = (app) => {
  // Endpoint used on the server
  //to get all researchers or to post and save a researcher
  app
    .route("/researchers")
    // GET endpoint used on the server to get all Researchers or to save a Researcher
    .get(getResearchers)

    // POST endpoint
    .post(addResearcher);

  // Endpoint used for getting a Researcher, update a Researcher or delete a Researcher
  app
    .route("/researcher/:ResearcherId")
    // Get specific Researcher
    .get(getResearcherById)

    // update a specific Researcher
    .put(updateResearcher)

    // update a specific Researcher
    .delete(removeResearcher);
};

export default routes;
