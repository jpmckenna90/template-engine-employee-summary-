// !TODO offload questions to another file to clean up app.js

const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./lib/questions")
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
    choices: ["engineer", "intern"]
  }
];
// Manager questions
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

async function managerInfo() {
  inquirer.prompt(managerQuestions).then(function(res) {
    const newManager = new Manager(
      res.name,
      res.id,
      res.email,
      res.officeNumber
    );
    console.log('Great, we will now begin adding team members to your team.');
    teamArray.push(newManager);
    getInfo();
  });
}

async function getInfo() {
  inquirer.prompt(standard).then(function(res) {
    const answers = res;
    switch (res.role) {
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
      case "engineer":
        // prettier-ignore
        const newEngineer = new Engineer(generic.name, generic.id, generic.email, specific.github);
        teamArray.push(newEngineer);
        inquirer.prompt(addMore).then(function(res) {
          if (res.continue === "Yes") {
            getInfo();
          } else if (res.continue === "No") {
            console.log("Great, we'll start generating your file.");
            // !!TODO add function here to generate html
          }
        });
        return;
      case "intern":
        // prettier-ignore
        const newIntern = new Intern(generic.name, generic.id, generic.email, specific.school);
        teamArray.push(newIntern);
        inquirer.prompt(addMore).then(function(res) {
          if (res.continue === "Yes") {
            getInfo();
          } else if (res.continue === "No") {
            console.log("Great, we'll start generating your file.");
            console.log(teamArray);
            // !!TODO add function here to generate html
          }
          return;
        });
    }
  } catch (err) {
    console.log(err);
  }
};

managerInfo();
// ! function here that loops through each item in the teamArray object and generates HTML based on user's role
