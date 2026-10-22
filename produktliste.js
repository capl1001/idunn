// Først bestemmer vi vores endpoint
const endpoint = "https://dummyjson.com/products?limit=0";
// Læser kateorien fra URL'en
const cat = new URLSearchParams(window.location.search).get("cat");

// Vi benytter os af queryselector
const produktliste = document.querySelector("#produktliste");
const visantal = document.querySelector("#filtre span");
const tilbageknap = document.querySelector("#tilbageknap");
const overskrift = document.querySelector("h1");

// Vi opretter to variabler

let alleData;
let udsnit;

// Filtrering
document.querySelectorAll("#filtre button").forEach((knap) => knap.addEventListener("click", filtrer));

// Sortering
document.querySelectorAll("#sortering button").forEach((knap) => knap.addEventListener("click", sorter));

// Tilbage-knap
tilbageknap.addEventListener("click", () => history.back());

// Vi fecther fra endpoint, altså henter den specifikke data fra det const endpoint vi har givet
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    // Vi henter ikke alle, men de tre relevante for vores produktside
    alleData = data.products.filter((element) => element.category === "furniture" || element.category === "home-decoration" || element.category === "kitchen-accessories");
    // Hvis der er valgt en kategori i URL'en, viser vi kun den kategori, hvis der ikke, viser vi alle produkter
    if (cat) {
      udsnit = alleData.filter((element) => element.category === cat);
      overskrift.textContent = cat;
    } else {
      udsnit = alleData;
      overskrift.textContent = "Products";
    }

    visData(udsnit);
  });

// ====FUNKTIONER====

// FILTRERING
function filtrer(e) {
  const valgt = e.target.textContent;

  // Vi gør det til regel at alle knapper under vores filtre id, skal være "ikke-aktive", så vi kan lave en regel for den aktive
    document.querySelectorAll("#filtre button").forEach((knap) => {
    knap.classList.remove("active");
  });

  // Bestemmer at vores knap er aktiv, så vi kan lave regler for hvordan den ser ud og arter sig ift de in-active
  e.target.classList.add("active");

  // Vi laver en regel, der skifter vores overskrift ud med den valgte tekst når man klikker på de forskellige kategorier
  overskrift.textContent = valgt;
  if (valgt === "All") {
    udsnit = alleData;
  } else if (valgt === "Furniture") {
    udsnit = alleData.filter((element) => element.category === "furniture");
  } else if (valgt === "Home-decoration") {
    udsnit = alleData.filter((element) => element.category === "home-decoration");
  } else if (valgt === "Kitchen-accessories") {
    udsnit = alleData.filter((element) => element.category === "kitchen-accessories");
  }
  visData(udsnit);
}

// TILBUDSPRIS - Da vores produkter allesammen har en tilbudspris, har vi valgt kun at vise dem der er over 10% rabat

function tilbudspris(element) {
  if (element.discountPercentage > 10){
  return Math.round(element.price - (element.price * element.discountPercentage / 100));
} else {
    return element.price;
  }
}

// SORTERING
function sorter(e) {
  const valgt = e.target.textContent;

    // Vi gør det til regel at alle knapper under vores sortering id, skal være "ikke-aktive", så vi kan lave en regel for den aktive

  document.querySelectorAll("#sortering button").forEach((knap) => {
    knap.classList.remove("active");
  });

  // Bestemmer at vores knap er aktiv, så vi kan lave regler for hvordan den ser ud og arter sig ift de in-active
  e.target.classList.add("active");

  if (valgt === "Price low-high") {
    udsnit.sort((a, b) => tilbudspris(a) - tilbudspris(b));
  } else if (valgt === "Price high-low") {
    udsnit.sort((a, b) => tilbudspris(b) - tilbudspris(a));
  } else if (valgt === "A-Z") {
    udsnit.sort((a, b) => a.title.localeCompare(b.title));
  } else if (valgt === "Z-A") {
    udsnit.sort((a, b) => b.title.localeCompare(a.title));
  }

  visData(udsnit);
}

// VIS PRODUKTER
function visData(json) {
  visantal.textContent = json.length;
  produktliste.innerHTML = "";

  json.forEach((element) => {
    const pris = tilbudspris(element);
// Vi vælger html opbygningen for voress produktkort ved at benytte de valgte properties fra vores Json
    produktliste.innerHTML += `
      <a class="card" href="produktdetaljer.html?id=${element.id}">
        <article>
          <img
            src="${element.thumbnail}"
            alt="${element.title}"
          >
          <h3>${element.title}</h3>

          ${element.discountPercentage > 10
              ? `<p class="tilbudslabel">-${element.discountPercentage.toFixed(0)}%</p>
                 <p>
                   <span class="førpris"> ${element.price} €</span>
                    ${pris} €
                 </p>`
              : `<p>${element.price} €</p>`
          }
        </article>
      </a>
    `;
  });
}
