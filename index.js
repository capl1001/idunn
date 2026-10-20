// De tre kategorier, vi henter fra DummyJSON
const endpoints = ["https://dummyjson.com/products/category/furniture", "https://dummyjson.com/products/category/home-decoration", "https://dummyjson.com/products/category/kitchen-accessories"];

// Vi vælger containeren til kategorierne
const catlistContainer = document.querySelector("#catlistContainer");

// Vi fetcher data fra de tre endpoints og viser dem som links
endpoints.forEach((endpoint) => {
  fetch(endpoint)
    .then((res) => res.json())
    .then(visData);
});

// Vi viser kategorierne som links
function visData(json) {
  console.log(json);

  // Vi henter kategorien fra det første produkt
  const category = json.products[0].category;

  // Vi laver et link til produktlisten med den valgte kategori
  catlistContainer.innerHTML += `
   <a href="produktliste.html?cat=${encodeURIComponent(category)}">
    ${category}
   </a>
  `;
}
