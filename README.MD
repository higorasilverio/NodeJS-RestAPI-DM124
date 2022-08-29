# NodeJS REST API

### REST API with Questions, Answers, and Users entities

##### Developed by: [Higor Silvério](https://github.com/higorasilverio)

##### Orientation by: [Frederico Augusto Laranjo Silva](https://github.com/fredllaranjo)

---

### Entities

> Question entity fields:
> id, status, description, options (nullable), creationDate and modifiedDate
>
> Answer entity fields:
> id, key, name, answer, questionId, creationDate and modifiedDate
>
> User entity fields:
> id, key, name, answer, questionId, creationDate and modifiedDate

---

### Methods

##### For Answers and Questions

> POST /api/answers or /api/questions - Creates new answer/question (authenticated)
>
> GET /api/answer or /api/questions - Gets all answers/questions (authenticated)
>
> GET /api/answer/:answerID or /api/questions/:questionID - Gets an answer/question (authenticated)
>
> PATCH /api/answer/:answerID or /api/questions/:questionID - Updates an answer/question (admin only)
>
> DELETE /api/answer/:answerID or /api/questions/:questionID - Deletes an answer/question (admin only)

##### For Users

> POST /users - Registers new user (admin only)
>
> GET /users/:userId - Retrieves user's information (admin only)
>
> PATCH /users/:userId - Updates user's role (admin only)
>
> DELETE /users/:userId - Deletes user (admin only)

##### For Authentication

> POST /login - Returns token for API usage (anyone)

##### For Swagger Documentation

> GET /documentation - On browser, shows API documentation (anyone)

---

### Running

##### To work properly, it requires a .env file with three simple variables

> DB_HOST=**_yourMongoDbHostConnectionString_**
>
> JWT_SECRET=**_yourJwtSecretString_**
>
> BCRYPT_SALT=**_yourBcryptSaltNumber_**

##### At the terminal, run `npm install` , to install all de dependencies, and then `npm start` , to run the application.

---

#### Authentication with OAuth2 support

#### Uses MongoDB as standard database (strategy design pattern allows other dabase structure)
