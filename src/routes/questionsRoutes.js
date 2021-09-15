import {
  addNewQuestion,
  getQuestions,
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
    .route("/api/questions/:questionID")
    .get(
      (req, res, next) => {
        //middleware
        console.log(`${req.method} request from: ${req.originalUrl}`);
        next();
      },
      (req, res, next) => {
        res.send("GET request successful!");
      }
    )
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

export default questionsRoutes;