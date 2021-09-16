import {
  addNewAnswer,
  getAnswers,
  getAnswerWithId,
  updateAnswer,
  deleteAnswer,
} from "../controllers/standardController";

const answersRoutes = (app) => {
  app
    .route("/api/answers")
    .post((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, addNewAnswer)
    .get((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, getAnswers);

  app
    .route("/api/answers/:answerId")
    .get((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, getAnswerWithId)
    .patch((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, updateAnswer)
    .delete((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, deleteAnswer);
};

export default answersRoutes;
