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
      next();
    }, addNewAnswer)
    .get((req, res, next) => {
      //middleware
      next();
    }, getAnswers);

  app
    .route("/api/answers/:answerId")
    .get((req, res, next) => {
      //middleware
      next();
    }, getAnswerWithId)
    .patch((req, res, next) => {
      //middleware
      next();
    }, updateAnswer)
    .delete((req, res, next) => {
      //middleware
      next();
    }, deleteAnswer);
};

export default answersRoutes;
