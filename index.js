import express from "express";
import usersRoutes from "./src/routes/usersRoutes";
import questionsRoutes from "./src/routes/questionsRoutes";
import answersRoutes from "./src/routes/answersRoutes";

const app = express();
const PORT = 4000;

usersRoutes(app);
questionsRoutes(app);
answersRoutes(app);

app.listen(PORT, () => console.info(`Server is running on port ${PORT}`));
