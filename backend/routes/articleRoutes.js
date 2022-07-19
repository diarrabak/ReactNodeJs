import {
    //Import all our controllers
    addArticle,
    getArticles,
    getArticleById,
    updateArticle,
    removeArticle,
  } from "../controllers/articleControllers.js";
  
  const routes = (app) => {
    // Endpoint used on the server
    //to get all Articles or to post and save a Article
    app
      .route("/articles")
      // GET endpoint used on the server to get all Articles or to save a Article
      .get(getArticles)
  
      // POST endpoint
      .post(addArticle);
  
    // Endpoint used for getting an Article, update an Article or delete an Article
    app
      .route("/article/:ArticleId")
      // Get specific Article
      .get(getArticleById)
  
      // update a specific Article
      .put(updateArticle)
  
      // update a specific Article
      .delete(removeArticle);
  };
  
  export default routes;
  