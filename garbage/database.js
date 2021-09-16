const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.FILE_NAME = "question.json";
  }

  async save(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
    return true;
  }

  async getAll() {
    const file = await readFileAsync(this.FILE_NAME, "utf8");
    return JSON.parse(file.toString());
  }

  async getById(id) {
    const data = await this.getAll();
    return data.filter((item) => item.id === id);
  }

  async updateRole(id, modifications) {
    const data = await this.getAll();
    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) throw Error("Not found!");
    const actual = data[index];
    const updatedObject = {
      ...actual,
      ...modifications,
    };
    data.splice(index, 1);
    return await this.save([...data, updatedObject]);
  }

  async delete(id) {
    if (!id) return await this.save([]);
    const data = await this.getAll();
    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) throw Error("Not found!");
    data.splice(index, 1);
    return await this.save(data);
  }
}

module.exports = new Database();
