const resultado = document.querySelector("#resultado");
const marcaId = document.querySelector("#marca");
const yearId = document.querySelector("#year");
const priceMaxId = document.querySelector("#price-max");
const priceMinId = document.querySelector("#price-min");
const doorId = document.querySelector("#door");
const transmisionId = document.querySelector("#transmision");
const colorId = document.querySelector("#color");

const max = new Date().getFullYear();
const min = max - 11;

const valorFilter = {
  marca: "",
  año: "",
  precioMax: "",
  precioMin: "",
  puertas: "",
  color: "",
  transmision: "",
};

//Eventos
addEventListeners();
function addEventListeners() {
  document.addEventListener("DOMContentLoaded", loadPage);
  marcaId.addEventListener("change", selectionOption);
  yearId.addEventListener("change", selectionOption);
  priceMinId.addEventListener("change", selectionOption);
  priceMaxId.addEventListener("change", selectionOption);
  doorId.addEventListener("change", selectionOption);
  transmisionId.addEventListener("change", selectionOption);
  colorId.addEventListener("change", selectionOption);
}

//Funciones
function loadPage() {
  mostrarAutos(autos);
  optionYearSelect();
}

function mostrarAutos(autos) {
  limpiadorHTML();
  autos.forEach((auto) => {
    const { marca, modelo, image, precio, puertas, color, transmision } = auto;
    const cardCarHTML = document.createElement("div");
    cardCarHTML.classList.add("card");
    cardCarHTML.innerHTML = `
          <div class="card__header">
            <h3 class="card__title">${marca} - ${modelo}</h3>
            <img src=${image} class="card__image" width=200 />
          </div>
          <div class="card__body">
            <h4>Descripcion</h4>
            <ul>
            <li>
            <h5>Marca</h5>
            <div>
            <p>${marca}</p>
            </div>
            </li>
            <li>
            <h5>Modelo</h5>
            <div>
            <p>${modelo}</p>
            </div>
            </li>
            <li>
            <h5>Puertas</h5>
            <div>            
            <p>${puertas}</p></div>
            </li>
            <li>
            <h5>Color</h5>
            <div>            
            <p>${color}</p>
            </div>
            </li>
            <li>
            <h5>Transmicion</h5>
            <div>
            <p>${transmision}</p>
            </div>
            </li>
            </ul>
          </div>
          <button>${precio}</button>
    `;
    resultado.appendChild(cardCarHTML);
  });
}

function optionYearSelect() {
  for (let i = max; i > min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearId.appendChild(option);
  }
}

function limpiadorHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function selectionOption(e) {
  switch (e.target.id) {
    case "marca":
      valorFilter.marca = e.target.value;
      break;
    case "year":
      valorFilter.año = parseInt(e.target.value);
      break;
    case "price-min":
      valorFilter.precioMin = parseInt(e.target.value);
      break;
    case "price-max":
      valorFilter.precioMax = parseInt(e.target.value);
      break;
    case "door":
      valorFilter.puertas = parseInt(e.target.value);
      break;
    case "color":
      valorFilter.color = e.target.value;
      break;
    case "transmision":
      valorFilter.transmision = e.target.value;
    default:
      break;
  }
  filterResult();
}

function filterResult() {
  const resultado = autos
    .filter(filterMarca)
    .filter(filterAño)
    .filter(filterPriceMin)
    .filter(filterPriceMax)
    .filter(filterDoor)
    .filter(filterColor)
    .filter(filterTransmision);

  mostrarAutos(resultado);
}

function filterMarca(auto) {
  const { marca } = valorFilter;
  if (marca !== "") {
    return auto.marca === marca;
  }
  return auto;
}

function filterAño(auto) {
  const { año } = valorFilter;
  if (año !== "") {
    return auto.year === año;
  }
  return auto;
}

function filterPriceMin(auto) {
  const { precioMin } = valorFilter;
  if (precioMin !== "") {
    return auto.precio > precioMin - 1;
  }
  return auto;
}

function filterPriceMax(auto) {
  const { precioMax } = valorFilter;
  if (precioMax !== "") {
    return auto.precio <= precioMax;
  }
  return auto;
}

function filterDoor(auto) {
  const { puertas } = valorFilter;
  if (puertas !== "") {
    return auto.puertas === puertas;
  }
  return auto;
}

function filterColor(auto) {
  const { color } = valorFilter;
  if (color !== "") {
    return auto.color === color;
  }
  return auto;
}

function filterTransmision(auto) {
  const { transmision } = valorFilter;
  if (transmision !== "") {
    return auto.transmision === transmision;
  }
  return auto;
}
