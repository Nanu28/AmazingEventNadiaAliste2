const contenedorCards = document.getElementById("sectionCards");
const url = "https://mindhub-xj03.onrender.com/api/amazing";
let arrayEventos = [];

fetch(url)
  .then(response => response.json())
  .then(data => {
    arrayEventos = data.events;
    mostrarLasTarjetas(arrayEventos, contenedorCards);
  })
  .catch(error => console.log(error));


import { crearTarjeta } from "../modules/fuciones.js";

function mostrarLasTarjetas(listaDeTarjetas, contenedor) {
  let template = '';
  for (const event of listaDeTarjetas) {
    const aux = crearTarjeta(event);
    template += aux;
  }
  contenedor.innerHTML = template;
}

const categoryContainer = document.getElementById("categoriesChechboxContainer");
const categories = ["Food","Museum","Concert","Race","Books","Cinema","Party"];

categories.forEach(category => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("category-checkbox");
  checkbox.value = category;

  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(category));

  categoryContainer.appendChild(label);
});

const categoryCheckboxes = document.querySelectorAll(".category-checkbox");
categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", applyFilters);
});

document.getElementById("inputSearchBox").addEventListener("keyup", applyFilters);

function applyFilters() {
  const selectedCategories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const searchText = document.getElementById("inputSearchBox").value.toLowerCase();

  const filteredEvents = arrayEventos.filter(event => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    const searchMatch = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText);
    return categoryMatch && searchMatch;
  });

  mostrarLasTarjetas(filteredEvents, contenedorCards);

  const searchMessage = document.getElementById("searchMessage");
  if (filteredEvents.length === 0) {
    searchMessage.innerHTML = `
      <img src="./assets/images/ImgError.png" class="imgError img-fluid" id="imgError" alt="messageErrorCat">
      <h2 class="text-center">Sorry, there are no matches! </h2>
    `;
  } else {
    searchMessage.textContent = "";
  }
}
