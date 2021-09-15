import {
  addNewAnswer,
  getAnswers,
  getAnswerWithId,
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
    .patch(
      (req, res, next) => {
        //middleware
        console.log(`${req.method} request from: ${req.originalUrl}`);
        next();
      },
      (req, res, next) => {
        res.send("PATCH request successful!");
      }
    )
    .delete(
      (req, res, next) => {
        //middleware
        console.log(`${req.method} request from: ${req.originalUrl}`);
        next();
      },
      (req, res, next) => {
        res.send("DELETE request successful!");
      }
    );
};

export default answersRoutes;
