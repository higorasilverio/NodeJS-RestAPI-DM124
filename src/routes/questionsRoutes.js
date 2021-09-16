import {
  addNewQuestion,
  getQuestions,
  getQuestionWithId,
  updateQuestion,
  deleteQuestion,
} from "../controllers/standardController";

const questionsRoutes = (app) => {
  app
    .route("/api/questions")
    .post((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, addNewQuestion)
    .get((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, getQuestions);

  app
    .route("/api/questions/:questionId")
    .get((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, getQuestionWithId)
    .patch((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, updateQuestion)
    .delete((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, deleteQuestion);
};

export default questionsRoutes;
