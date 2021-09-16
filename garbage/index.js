const { program } = require("commander");
const Database = require("./database");
const Question = require("./question");

async function main() {
  program
    .version("0.0.1")
    .option("-s, --status [value]", "Status")
    .option("-d, --description [value]", "Description")
    .option("-o, --options [value]", "Options")
    .option("--save", "Save new question")
    .parse(process.argv);
  const question = new Question(program);
  try {
    if (program.save) {
      console.log(question);
    }
  } catch (error) {
    console.log({ error });
  }
}

main();
