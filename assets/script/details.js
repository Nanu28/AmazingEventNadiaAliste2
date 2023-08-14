const parametros = location.search;
console.log(parametros);

const objetoUrl = new URLSearchParams(parametros);
console.log(objetoUrl);

const nombreEvento = objetoUrl.get("name");
console.log(nombreEvento);

const events = data.events;
console.log(events);

const objetoEvento = events.find(objetoEvento => objetoEvento.name === nombreEvento);
console.log(objetoEvento);

const contenedorDetails = document.getElementById("sectionCardsDetails");

function crearTarjeta(event) {
  return `
    <article class="cardsInfoDatails">
      <div>
        <img src="${event.image}" class="imgDetails" alt="">
      </div>
      <div class="cardsDatails" id="cardsDetailsInfo">
        <h2 class="card-title">${event.name}</h2>
        <p><b>date:</b> ${event.date}</p>
        <p><b>description:</b> ${event.description}</p>
        <p><b>category:</b> ${event.category}</p>
        <p><b>place:</b> ${event.place}</p>
        <p><b>capacity:</b> ${event.capacity}</p>
        <p><b>estimate:</b> ${event.assistance}</p>
        <p><b>price:</b> ${event.price}</p>
      </div>
    </article>`;
}
const estructuraString = crearTarjeta(objetoEvento);
console.log(estructuraString);

function renderizaTarjeta(elementHTML, string) {
  elementHTML.innerHTML = string;
}
renderizaTarjeta(contenedorDetails, estructuraString);






