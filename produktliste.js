// Først bestemmer vi vores endpoint
const endpoint = "https://dummyjson.com/products?limit=0";


// Vi benytter os af queryselector 
const produktliste = document.querySelector("#produktliste");
const visantal = document.querySelector("#filtre span");
const tilbageknap = document.querySelector("#tilbageknap");
const overskrift = document.querySelector("h2");

// Vi opretter to variabler

let alleData;
let udsnit;


// Filtrering
document.querySelectorAll("#filtre button").forEach(knap => 
    knap.addEventListener("click", filtrer)
);


// Sortering
document.querySelectorAll("#sortering button").forEach(knap => 
    knap.addEventListener("click", sorter)
);


// Tilbage-knap
tilbageknap.addEventListener("click", () => history.back());


// Vi fecther fra endpoint, altså henter den specifikke data fra det const endpoint vi har givet
fetch(endpoint)
    .then(res => res.json())
    .then(data => {

        // Vi henter ikke alle, men de tre relevante for vores produktside
        alleData = data.products.filter(element =>
            element.category === "furniture" ||
            element.category === "home-decoration" ||
            element.category === "kitchen-accessories"
        );
        udsnit = alleData;
        visData(udsnit);
    });

// FUNKTIONER
// Vi 

// FILTRERING
function filtrer(e) {
    const valgt = e.target.textContent;

    overskrift.textContent = valgt;
    if (valgt === "All") {
        udsnit = alleData;
    } else if (valgt === "Furniture") {
        udsnit = alleData.filter(element => element.category === "furniture");
    } else if (valgt === "Home-decoration") {
        udsnit = alleData.filter(element => element.category === "home-decoration");
    } else if (valgt === "Kitchen-accessories") {
        udsnit = alleData.filter(element => element.category === "kitchen-accessories");
    }
    visData(udsnit);
}


// SORTERING
function sorter(e) {
    const valgt = e.target.textContent;
    if (valgt === "Price low-high") {
        udsnit.sort((a, b) => a.price - b.price);
    } else if (valgt === "Price high-low") {
        udsnit.sort((a, b) => b.price - a.price);
    } else if (valgt === "A-Z") {
        udsnit.sort((a, b) => 
            a.title.localeCompare(b.title)
        );
    } else if (valgt === "Z-A") {
        udsnit.sort((a, b) => 
            b.title.localeCompare(a.title)
        );
    }

    visData(udsnit);
}


// VIS PRODUKTER
function visData(json) {

    visantal.textContent = json.length;
    produktliste.innerHTML = "";
    json.forEach(element => {
        produktliste.innerHTML += `
            <a class="card" href="produktdetaljer.html?id=${element.id}">
                <article>
                    <img 
                        src="${element.thumbnail}" 
                        alt="${element.title}"
                    >
                    <h3>${element.title}</h3>
                    <p>${element.price} €</p>
                </article>
            </a>
        `;
    });
}