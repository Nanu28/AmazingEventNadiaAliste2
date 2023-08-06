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
                <a href="./details.html" class="btn btn-primary">Details</a>
               
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
