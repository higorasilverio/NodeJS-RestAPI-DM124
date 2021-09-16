import {
  registerUser,
  getUserWithId,
  updateUserRole,
} from "../controllers/standardController";

const usersRoutes = (app) => {
  app.route("/api/users/register").post((req, res, next) => {
    //middleware
    next();
  }, registerUser);

  app.route("/api/users/:userId").get((req, res, next) => {
    //middleware
    next();
  }, getUserWithId);

  app.route("/api/users/change-role/:userId").patch((req, res, next) => {
    //middleware
    next();
  }, updateUserRole);
};

export default usersRoutes;
