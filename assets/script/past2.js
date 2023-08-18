const contenedorCards = document.getElementById("sectionCards");
const url = "https://mindhub-xj03.onrender.com/api/amazing";
let arrayEventos = [];

const currentDate = new Date("2023-03-10");

fetch(url)
  .then(response => response.json())
  .then(data => {
    arrayEventos = data.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < currentDate;
    });

    const eventosFiltrados = filtrarTarjetas(arrayEventos, currentDate);
    mostrarLasTarjetas(eventosFiltrados, contenedorCards);
  })
  .catch(error => console.log(error));


function crearTarjeta(event) {
  return `
  <article class="card">
    <img src="${event.image}">
    <div class="card-body text-center">
      <h2 class="card-title">${event.name}</h2>
      <p class="card-text">${event.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <h3>Price: ${event.price}</h3>
        <a href="../pages/details.html?name=${event.name}" class="btn btn-primary">Details</a>
      </div>
    </div>
  </article>`;
}

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
      <img src="../images/ImgError.png" class="imgError img-fluid" id="imgError" alt="messageErrorCat">
      <h2 class="text-center">Sorry, there are no matches! </h2>
    `;
  } else {
    searchMessage.textContent = "";
  }
}

function filtrarTarjetas(dataCards, currentDate) {
  const tarjetasFiltradas = [];
  for (const data of dataCards) {
    if (new Date(data.date) < currentDate) {
      tarjetasFiltradas.push(data);
    }
  }
  return tarjetasFiltradas;
}





