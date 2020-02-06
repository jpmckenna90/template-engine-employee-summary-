// Variable and requirement declarations
const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./lib/questions");
const newHTML = require("./generateHTML.js");
const engiHTML = require("./generateHTML.js");
const internHTML = require("./generateHTML");
const managerHTML = require("./generateHTML.js");
const teamArray = [];
let empString = "";
let manString = "";

// Function to generate manager. Separated as it only occurs once per iteration. 
async function managerInfo() {
  inquirer.prompt(questions.managerQuestions).then(function(res) {
    const newManager = new Manager(
      res.name,
      res.id,
      res.email,
      "manager",
      res.officeNumber
    );
    console.log("Great, we will now begin adding team members to your team.");
    teamArray.push(newManager);
    getInfo();
  });
}

// Function to gather information about team
async function getInfo() {
  inquirer.prompt(questions.standard).then(function(res) {
    const answers = res;
    // Switch to determine specific role-based questions
    switch (res.role) {
      case "engineer":
        inquirer.prompt(questions.engineerQuestions).then(function(res) {
          creation(answers, res);
        });
        return;
      case "intern":
        inquirer.prompt(questions.internQuestions).then(function(res) {
          creation(answers, res);
        });
        return;
    }
  });
}

// Function receives answers of generic team questions and specific role-based questions and creates objects
const creation = (generic, specific) => {
  console.log(generic);
  try {
    switch (generic.role) {
      case "engineer":
        // prettier-ignore
        const newEngineer = new Engineer(generic.name, generic.id, generic.email, generic.role, specific.github);
        teamArray.push(newEngineer);
        inquirer.prompt(questions.addMore).then(function(res) {
          if (res.continue === "Yes") {
            getInfo();
          } else if (res.continue === "No") {
            console.log("Great, we'll start generating your file.");
            createHTML(teamArray);
          }
        });
        return;
      case "intern":
        // prettier-ignore
        const newIntern = new Intern(generic.name, generic.id, generic.email, generic.role, specific.school);
        console.log(newIntern);
        teamArray.push(newIntern);
        inquirer.prompt(questions.addMore).then(function(res) {
          if (res.continue === "Yes") {
            getInfo();
          } else if (res.continue === "No") {
            console.log("Great, we'll start generating your file.");
            createHTML(teamArray);
          }
          return;
        });
    }
  } catch (err) {
    console.log(err);
  }
};

// Function loops over items in teamArray to generate HTML
const createHTML = teamArray => {
  teamArray.forEach(employee => {
    switch (employee.role) {
      case "manager":
        manString += managerHTML.managerHTML(employee);
        return;
      case "engineer":
        empString += engiHTML.engiHTML(employee);
        return;
      case "intern":
        empString += internHTML.internHTML(employee);
        return;
    }
  });

  const myFile = newHTML.HTML(manString, empString);

  fs.writeFile("team.html", myFile, err => {
    console.log(myFile);
    if (err) {
      console.log(err);
    }
  });
};

managerInfo();

