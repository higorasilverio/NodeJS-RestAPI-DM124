const usersRoutes = (app) => {
  app.route("/api/users/register").post(
    (req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    },
    (req, res, next) => {
      res.send("POST request successful!");
    }
  );

  app.route("/api/users/:userId").get(
    (req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    },
    (req, res, next) => {
      res.send("GET request successful!");
    }
  );

  app.route("/api/users/change-role/:userId").patch(
    (req, res, next) => {
      //middleware
      console.log(`${req.method} request from: ${req.originalUrl}`);
      next();
    },
    (req, res, next) => {
      res.send("PATCH request successful!");
    }
  );
};

export default usersRoutes;
