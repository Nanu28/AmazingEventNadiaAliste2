const contenedorPrincipal = document.getElementById("sectionCards");
const event2 = data.events;

    function crearTarjeta(event2) {
    return `<article class="card">
         <img src="${event2.image}">
         <div class="card-body text-center">
             <h2 class="card-title">${event2.name}</h2>
             <p class="card-text">${event2.description}</p>
             <div class="d-flex justify-content-between align-items-center">
                 <h3>Price: ${event2.price}</h3>
                 <a href="/assets/pages/details.html" class="btn btn-primary">Details</a>
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
