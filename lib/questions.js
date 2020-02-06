// Array of standard user questions
const standard = [
  {
    type: "input",
    message: "What is the employee's name?",
    name: "name"
  },
  {
    type: "input",
    message: "What is the employee's ID number?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the employee's email address?",
    name: "email"
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "role",
    choices: ["engineer", "intern"]
  }
];
// Manager question
const managerQuestions = [
  {
    type: "input",
    message: "What is the team manager's name?",
    name: "name"
  },
  {
    type: "input",
    message: "What is the team manager's ID number?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the team manager's email address?",
    name: "email"
  },
  {
    type: "input",
    message: "What is the team manager's office number?",
    name: "officeNumber"
  }
];
// Engineer question
const engineerQuestions = [
  {
    type: "input",
    message: "What is the employee's github username?",
    name: "github"
  }
];
// Intern Question
const internQuestions = [
  {
    type: "input",
    message: "Where is the employee going to school?",
    name: "school"
  }
];

const addMore = [
  {
    type: "list",
    message: "Would you like to add more employees?",
    name: "continue",
    choices: ["Yes", "No"]
  }
];

exports.standard = standard;
exports.managerQuestions = managerQuestions;
exports.engineerQuestions = engineerQuestions;
exports.internQuestions = internQuestions;
exports.addMore = addMore;
