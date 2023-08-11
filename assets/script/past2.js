document.addEventListener("keyup", event => {
    if (event.target.matches("#inputSearchBox")) {
        document.querySelectorAll(".card").forEach(evento => {
            const searchText = event.target.value.toLowerCase();
            const cardText = evento.textContent.toLowerCase();

    if (cardText.includes(searchText)) {
                evento.classList.remove("filtro");
          }else {
                evento.classList.add("filtro");
            }
        });

        const searchMessage = document.getElementById("searchMessage");
        const visibleCards = document.querySelectorAll(".card:not(.filtro)");
        if (visibleCards.length === 0) {
            searchMessage.textContent = "Sorry, there are no matches! :( ";
        } else {
            searchMessage.textContent = "";
        }
    }
});
const contenedorPrincipal = document.getElementById("sectionCards");
const event2 = data.events;
const currentDate = data.currentDate;

function filtrarTarjetas(dataCards, currentDate) {
    const tarjetasFiltradas = [];
    for (const data of dataCards) {
        if (currentDate > data.date) {
            tarjetasFiltradas.push(data);
        }
    }
    console.log(tarjetasFiltradas);
    return tarjetasFiltradas;
}

const data2 = filtrarTarjetas(event2, currentDate);
console.log(data2);

function crearTarjeta(data2) {
    return `<article class="card">
        <img src="${data2.image}">
        <div class="card-body text-center">
            <h2 class="card-title">${data2.name}</h2>
            <p class="card-text">${data2.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <h3>Price: ${data2.price}</h3>
                <a href="./details.html?name=${data2.name}" class="btn btn-primary">Details</a>
               
            </div>
        </div>
    </article>`;
}

function mostrarLasTarjetas(listaDeTarjetas, contenedor) {
    let template = '';
    for (const data2 of listaDeTarjetas) {
        const aux = crearTarjeta(data2);
        template += aux;
    }
    contenedor.innerHTML = template;
}

mostrarLasTarjetas(data2, contenedorPrincipal);

const checkboxs = document.getElementById("checkboxs");
checkboxs.addEventListener('change', () => {
    const checkedCheckboxes  = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    const selectedCategories = checkedCheckboxes.map(checkbox => checkbox.value); 
    console.log(selectedCategories);
    const filteredEvents = data2.filter(event => selectedCategories.includes(event.category));
    
    mostrarLasTarjetas(filteredEvents, contenedorPrincipal);
});
