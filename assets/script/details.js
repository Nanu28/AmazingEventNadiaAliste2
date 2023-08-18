const parametros = new URLSearchParams(location.search);
const nombreEvento = parametros.get("name");
const url = "https://mindhub-xj03.onrender.com/api/amazing";
const contenedorDetails = document.getElementById("sectionCardsDetails");


function crearTarjeta(event) {
  return `
    <article class="cardsInfoDetails">
      <div>
        <img src="${event.image}" class="imgDetails" alt="">
      </div>
      <div class="cardsDetails" id="cardsDetailsInfo">
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

function renderizaTarjeta(elementHTML, string) {
  elementHTML.innerHTML = string;
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    const events = data.events;

    const objetoEvento = events.find(evento => evento.name === nombreEvento);

    if (objetoEvento) {
      const estructuraString = crearTarjeta(objetoEvento);
      renderizaTarjeta(contenedorDetails, estructuraString);
    } else {
      console.log("Evento no encontrado");
    }
  })
  .catch(error => console.log(error));
