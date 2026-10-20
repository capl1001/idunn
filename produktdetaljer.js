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
  return Math.round(element.price - (element.price * element.discountPercentage) / 100);
}

// Funktion til at vise dataen på produktdetaljesiden
function visData(element) {
  console.log(element);

  // Vi tjekker om produktet har mere end 10% rabat
  const harTilbud = element.discountPercentage > 10;

  // Vi beregner kun tilbudsprisen, hvis produktet har tilbud
  const pris = harTilbud ? tilbudspris(element) : element.price;

  // Vi tilføjer produktets data til vores container
  product.innerHTML += `
    <article class="product-detail">
      <div>

      <img src="${element.thumbnail}" alt="${element.title}" />
</div>
      <div>
      <div class="product-info">
        ${element.brand ? `<h2>${element.brand}</h2>` : ""}
        <h1>${element.title}</h1>

        ${
          harTilbud
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

      <article class="info">
      <details class="accordion">
        <summary>Specifications</summary>
        <div> <p>Description: ${element.description}</p> 
        ${element.dimensions ? `<p>Dimensions: ${element.dimensions.width} x ${element.dimensions.height} x ${element.dimensions.depth}</p>` : ""}
        <p>Weight: ${element.weight}kg</p>
        
        </div>
        </details>
        <details class="accordion">
        <summary>Shipping & Returns</summary>
        <div> <p>${element.shippingInformation}</p> 
        <p>${element.returnPolicy}</p>
        
        </div>

        </details>
        <details class="accordion">
        <summary>Warranty & Availability</summary>
        <div> <p>Warranty Information: ${element.warrantyInformation}</p>
        <p>Availability: ${element.availabilityStatus}</p>
        </div>
        </details>
      </article>
</div>

      <button class="add-to-cart">Add to cart</button>
    </article>
  `;
}
