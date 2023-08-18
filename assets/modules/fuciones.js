export function crearTarjeta(event) {
    return `
    <article class="card">
      <img src="${event.image}">
      <div class="card-body text-center">
        <h2 class="card-title">${event.name}</h2>
        <p class="card-text">${event.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <h3>Price: ${event.price}</h3>
          <a href="./assets/pages/details.html?name=${event.name}" class="btn btn-primary">Details</a>
        </div>
      </div>
    </article>`;
  }
  
  