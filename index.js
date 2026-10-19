// const endpoint = "https://dummyjson.com/products/category/furniture";

// const catlistContainer = document.querySelector("#catlistContainer");

// fetch(endpoint)
//   .then((res) => res.json())
//   .then(visData);

// function visData(json) {
//   console.log(json);
//   json.forEach((produkt) => {
//     catlistContainer.innerHTML += `
//     <a href="produktliste.html?cat=${encodeURI(produkt.category)}"> ${produkt.category}</a>`;
//   });
// }

const endpoints = ["https://dummyjson.com/products/category/furniture", "https://dummyjson.com/products/category/home-decoration", "https://dummyjson.com/products/category/kitchen-accessories"];

const catlistContainer = document.querySelector("#catlistContainer");

endpoints.forEach((endpoint) => {
  fetch(endpoint)
    .then((res) => res.json())
    .then(visData);
});

function visData(json) {
  console.log(json);

  catlistContainer.innerHTML += `
    <a href="produktliste.html?cat=${encodeURIComponent(json.products[0].category)}">
      ${json.products[0].category}
    </a>
  `;
}
