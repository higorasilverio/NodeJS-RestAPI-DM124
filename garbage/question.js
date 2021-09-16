class Question {
  constructor({ id, status, description, options }) {
    this.id = id;
    this.status = status;
    this.description = description;
    this.options = options || null;
    this.creationDate = Date.now();
    this.modifiedDate = Date.now();
  }
}

module.exports = Question;
