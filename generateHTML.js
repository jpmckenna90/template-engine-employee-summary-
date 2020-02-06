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
    <title>Document</title>
  </head>
  <body>
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
  crossorigin="anonymous">
  </script>
</html>`;
};

const managerHTML = (manager) => {
  return `<div class="col-3"><div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
  <h1>${manager.name}</h1>
  <h3>${manager.role}</h3>
    <h6>Email: ${manager.email}</h6>
    <h6>ID: ${manager.id}</h6>
    <h6>Office Number: ${manager.officeNumber}</h6>
  </div>
</div></div>`
}

const engiHTML = (engineer) => {
  return `<div class="col-3"><div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
  <h1>${engineer.name}</h1>
    <h3 class="card-title">${engineer.role}</h3>
    <h6>Email: ${engineer.email}</h6>
    <h6>ID: ${engineer.id}</h6>
    <a href="https://www.github.com/${engineer.github}" class="btn btn-primary">Github</a>
  </div>
</div></div>`
}

const internHTML = (intern) => {
  return `<div class="col-3"><div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${intern.name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div></div>`
}

exports.HTML = HTML;
exports.engiHTML = engiHTML;
exports.internHTML = internHTML;
exports.managerHTML = managerHTML;