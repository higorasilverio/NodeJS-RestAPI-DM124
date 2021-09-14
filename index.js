import express from "express";
import mongoose from "mongoose";

import usersRoutes from "./src/routes/usersRoutes";
import questionsRoutes from "./src/routes/questionsRoutes";
import answersRoutes from "./src/routes/answersRoutes";

const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/QAdb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

usersRoutes(app);
questionsRoutes(app);
answersRoutes(app);

app.listen(PORT, () => console.info(`Server is running on port ${PORT}`));
