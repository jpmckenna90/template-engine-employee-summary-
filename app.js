// !TODO offload questions to another file to clean up app.js

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
let htmlstring = "";

const preString = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <title>Document</title>
  </head>
  <body>
    <div class="container">
      <div class="row" id="managerrow">
      </div>
      <div class="row" id="staffrow">`;

const postString = `</div>
</div>
</body>
<script
src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="
crossorigin="anonymous">
</script>
</html>`;

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
      "Manager",
      res.officeNumber
    );
    console.log("Great, we will now begin adding team members to your team.");
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
  console.log(generic);
  try {
    switch (generic.role) {
      case "engineer":
        // prettier-ignore
        const newEngineer = new Engineer(generic.name, generic.id, generic.email, generic.role, specific.github);
        teamArray.push(newEngineer);
        inquirer.prompt(addMore).then(function(res) {
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
        inquirer.prompt(addMore).then(function(res) {
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

const createHTML = teamArray => {
  teamArray.forEach(employee => {
    switch (employee.role) {
      case "manager":
        htmlstring += managerHTML.managerHTML(employee);
      case "engineer":
        htmlstring += engiHTML.engiHTML(employee);
        return;
      case "intern":
        htmlstring += internHTML.internHTML(employee);
        return;
    }
  });

  const myFile = preString + htmlstring + postString;
  fs.writeFile("team.html", myFile, err => {
    if (err) {
      console.log(err);
    }
  });
};

managerInfo();

