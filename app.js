const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const teamArray = [];
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
    choices: ["manager", "engineer", "intern"]
  }
];
// Manager question
const managerQuestions = [
  {
    type: "input",
    message: "What is the employee's office number?",
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

async function getInfo() {
  inquirer.prompt(standard).then(function(res) {
    const answers = res;
    switch (res.role) {
      case "manager":
        inquirer.prompt(managerQuestions).then(function(res) {
          creation(answers, res);
        });
        return;
      case "engineer":
        inquirer.prompt(engineerQuestions).then(function(res) {
          creation(answers, res);
        });
        return;
      case "intern":
        inquirer.prompt(internQuestions).then(function(res) {
          creation(answers, res);
        });
        return;
    }
  });
}

const creation = (generic, specific) => {
  try {
    switch (generic.role) {
      case "manager":
        // prettier-ignore
        const newManager = new Manager(generic.name, generic.id, generic.email, specific.officeNumber);
        // console.log(newManager);
        teamArray.push(newManager);
        console.log(teamArray);
        inquirer.prompt(addMore).then(function(res) {
          if (res.continue === "Yes") {
            getInfo();
          } else if (res.continue === "No"){
            console.log("Great, we'll start generating your file.");
          }
        });
        return;
      case "engineer":
        // prettier-ignore
        const newEngineer = new Engineer(generic.name, generic.id, generic.email, specific.github);
        teamArray.push(newEngineer);
        console.log(teamArray);
        inquirer.prompt(addMore).then(function(res) {
          if (res.continue === "Yes") {
            getInfo();
          } else if (res.continue === "No"){
            console.log("Great, we'll start generating your file.");
          }
        });
        return;
      case "intern":
        // prettier-ignore
        const newIntern = new Intern(generic.name, generic.id, generic.email, specific.school);
        teamArray.push(newIntern);
        console.log(teamArray);
        inquirer.prompt(addMore).then(function(res) {
          if (res.continue === "Yes") {
            getInfo();
          } else if (res.continue === "No"){
            console.log("Great, we'll start generating your file.");
          }
          return;
        });
    }
  } catch (err) {
    console.log(err);
  }
};

getInfo();
