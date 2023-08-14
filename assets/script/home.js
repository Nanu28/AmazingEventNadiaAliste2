document.addEventListener("keyup", event => {
    if (event.target.matches("#inputSearchBox")) {
        document.querySelectorAll(".card").forEach(evento => {
            const searchText = event.target.value.toLowerCase();
            const cardText = evento.textContent.toLowerCase();
            if (cardText.includes(searchText)) {
                evento.classList.remove("filtro");
            } else {
                evento.classList.add("filtro");
            }
        });

        const searchMessage = document.getElementById("searchMessage");
        const visibleCards = document.querySelectorAll(".card:not(.filtro)");

        if (visibleCards.length === 0) {
            searchMessage.innerHTML = `
            <img src="./assets/images/ImgError.png" class="imgError img-fluid"  id="imgError" alt="messageErrorCat">
            <h2 class="text-center">Sorry, there are no matches! </h2>
            `;
        } else {
            searchMessage.textContent = "";
        }
    }
});


const contenedorPrincipal = document.getElementById("sectionCards");
const event2 = data.events;

const checkboxs = document.getElementById("checkboxs");
checkboxs.addEventListener('change', () => {
    const checkedCheckboxes  = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    const selectedCategories = checkedCheckboxes.map(checkbox => checkbox.value); 
    console.log(selectedCategories);

    if (selectedCategories.length === 0) {
        mostrarLasTarjetas(event2, contenedorPrincipal);
    } else {
        const filteredEvents = event2.filter(event => selectedCategories.includes(event.category));
        mostrarLasTarjetas(filteredEvents, contenedorPrincipal);
    }
    
});

 function crearTarjeta(event2) {
    return `<article class="card">
         <img src="${event2.image}">
         <div class="card-body text-center">
             <h2 class="card-title">${event2.name}</h2>
             <p class="card-text">${event2.description}</p>
             <div class="d-flex justify-content-between align-items-center">
                 <h3>Price: ${event2.price}</h3>
                 <a href="./assets/pages/details.html?name=${event2.name}" class="btn btn-primary">Details</a>
             </div>
         </div>
         </article>`;
}

function mostrarLasTarjetas(listaDeTarjetas, contenedor) {
    let template = '';
    for (const event2 of listaDeTarjetas) {
        const aux = crearTarjeta(event2);
        template += aux;
    }
    contenedor.innerHTML = template;
}

mostrarLasTarjetas(event2, contenedorPrincipal);

