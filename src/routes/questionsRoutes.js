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
      next();
    }, addNewQuestion)
    .get((req, res, next) => {
      //middleware
      next();
    }, getQuestions);

  app
    .route("/api/questions/:questionId")
    .get((req, res, next) => {
      //middleware
      next();
    }, getQuestionWithId)
    .patch((req, res, next) => {
      //middleware
      next();
    }, updateQuestion)
    .delete((req, res, next) => {
      //middleware
      next();
    }, deleteQuestion);
};

export default questionsRoutes;
