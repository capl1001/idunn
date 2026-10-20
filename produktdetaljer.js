
 // Vi henter id fra URL'en
const id = new URLSearchParams(window.location.search).get("id");

// Vi henter det specifikke produkt fra DummyJSON
const endpoint = `https://dummyjson.com/products/${id}`;

// Vi benytter os af queryselector til at finde vores container og knap
const product = document.querySelector("#product");
const backbutton = document.querySelector("#backbutton");

// Vi tilføjer en eventlistener til tilbage-knappen
backbutton.addEventListener("click", () => history.back());

// Vi fetcher fra endpoint
fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

// Funktion til at beregne tilbudsprisen
function tilbudspris(element) {
  return Math.round(
    element.price -
      (element.price * element.discountPercentage) / 100
  );
}

// Funktion til at vise dataen på produktdetaljesiden
function visData(element) {
  console.log(element);

  // Vi tjekker om produktet har mere end 10% rabat
  const harTilbud = element.discountPercentage > 10;

  // Vi beregner kun tilbudsprisen, hvis produktet har tilbud
  const pris = harTilbud
    ? tilbudspris(element)
    : element.price;

  // Vi tilføjer produktets data til vores container
  product.innerHTML += `
    <article class="product-detail">
      <h1>${element.title}</h1>

      <img src="${element.thumbnail}" alt="${element.title}" />

      <div class="product-info">
        <h2>${element.brand ?? ""}</h2>

        ${harTilbud
            ? `
              <p class="tilbudslabel">
                -${element.discountPercentage.toFixed(0)}%
              </p>
              <p class="price">
                <span class="førpris"> ${element.price} €</span>
                 ${pris} €
              </p>
            `
            : `<p class="price">${element.price} €</p>`
        }

        <div class="accordion">
          <p class="description">${element.description}</p>
        </div>

        <button class="buy-button">Add to cart</button>
      </div>
    </article>
  `;
}
