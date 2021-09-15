import { addNewAnswer } from "../controllers/standardController";

const answersRoutes = (app) => {
  app
    .route("/api/answers")
    .post((req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    }, addNewAnswer)
    .get(
      (req, res, next) => {
        //middleware
        console.log(`${req.method} request from: ${req.originalUrl}`);
        next();
      },
      (req, res, next) => {
        res.send("GET request successful!");
      }
    );

  app
    .route("/api/answers/:answerID")
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

export default answersRoutes;
