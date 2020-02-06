const HTML = (manager, employees) => {
  return `<!DOCTYPE html>
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
    <title>Team Profile Generator</title>
  </head>
  <style>
      .jumbotron {
        background-color: darkblue;
        color: white;
      }

      .row{
        margin-top: 2%;
      }

      .card{
        height:100%;
      }

    </style>
  <body>
  <div class="jumbotron text-center">
  <h1>My Team</h1>
</div>
    <div class="container">
      <div class="row" id="managerrow">
      ${manager}
      </div>
      <div class="row" id="staffrow">
        ${employees}
      </div>
    </div>
  </body>
  <script
  src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
  integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="
  crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/8d13be2a88.js" crossorigin="anonymous"></script> 
</html>`;
};

const managerHTML = manager => {
  return `<div class="col-12"><div class="card mx-auto" style="width: 18rem;">
  <div class="card-body">
  <i class="fas fa-mug-hot"></i><h1>${manager.name}</h1>
  <h3>${manager.role}</h3>
    <h6>Email: ${manager.email}</h6>
    <h6>ID: ${manager.id}</h6>
    <h6>Office Number: ${manager.officeNumber}</h6>
  </div>
</div></div>`;
};

const engiHTML = engineer => {
  return `<div class="col-3"><div class="card" style="width: 18rem;">
  <div class="card-body">
  <i class="fas fa-code"></i><h1>${engineer.name}</h1>
    <h3 class="card-title">${engineer.role}</h3>
    <h6>Email: ${engineer.email}</h6>
    <h6>ID: ${engineer.id}</h6>
    <a href="https://www.github.com/${engineer.github}" class="btn btn-primary">Github</a>
  </div>
</div></div>`;
};

const internHTML = intern => {
  return `<div class="col-3"><div class="card" style="width: 18rem;">
  <div class="card-body">
  <i class="fas fa-book-open"></i><h1 class="card-title">${intern.name}</h1>
    <h3 class="card-title">${intern.role}</h3>
    <h6>Email: ${intern.email}</h6>
    <h6>ID: ${intern.id}</h6>
    <h6>School: ${intern.school}</h6>
  </div>
</div></div>`;
};

exports.HTML = HTML;
exports.engiHTML = engiHTML;
exports.internHTML = internHTML;
exports.managerHTML = managerHTML;
