# Om projektet
Vi har i denne opgave lavet en dynamisk website, med udgangspunkt i et tildelt Json API.
Projektet er en fiktiv case, som tager udgangspunkt i kategorien Products i det tildelte Json API. Vi har udviklet et website, der med fokus på at formidle en tydelig visuel identitet i et brugervenligt site, rammer målgruppen.

Vores site består af flere sider hvor brugeren kan følgende:

- Få en tydelig visuel identitet på forsiden, hvor brugeren kan klikke på CTA knapper der fører videre til en produktliste, og nogle billeder hvor man kan få inspiration til boligindretning.
- Der er en tydelig navigation i form af en burgermenu i mobilversion, hvor brugeren nemt kan finde den ønskede underside. 
- Der er en produktliste, hvor man kan sortere og filtrere.
- Der er en produktside, når man trykker på et specifikt produkt, på denne side får man ved brug af accordion mere information om produktet, og kan tilføje produktet til sin kurv. 
- Der er undersiderne, About us, Inspiration og Return policy. 


# Links
- **Repository:**  https://github.com/capl1001/idunn.git 
- **Github pages:** https://capl1001.github.io/idunn/
- **Figma:** https://www.figma.com/design/WIhCgrTEuQATmqNLRGLwu8/T8---Team-projekt?node-id=0-1&t=CymiKzqxBeVFUU8q-1


# Projektstruktur
Vi har opdelt vores projekt i mapper. Her har vi mapperne css, fonts og img. Derudover har vi vores html og javascript filer som ligger udenfor mapperne.

Vores filstruktur ser derfor således ud:

```text
idunn/
├── css/
│   ├── index.css
│   ├── inspiration.css
│   ├── main.css
│   ├── omos.css
│   ├── produktdetaljer.css
│   ├── produktliste.css
│   └── support.css
├── Fonts/
│   ├── instrumentsans-variablefont.woff2
│   ├── instrumentsans-italic-variablefont.woff2
│   └── inter.variablefont.woff
├── img/
│   ├── forsideimg.webp
│   ├── logo.webp
│   └── logo_ø.webp
├── burgermenu.js
├── index.html
├── index.js
├── inspiration.html
├── omos.html
├── produktdetaljer.html
├── produktdetaljer.js
├── produktliste.html
├── produktliste.js
├── support.html
├── support.js
└── README.md
```

## Filbeskrivelser
css mappe - her har vi en side til hver af vores undersider, og herinde styler vi hjemmesiden

fonts mappe - herinde ligger de fonts vi bruger på hjemmesiden

img mappe - her ligger vores logoer, og andre billeder som ikke er fra vores json api. 

burgermenu - javascript på burgermenu

index.html - forside

inspiration.html - underside med inspiration til boligindretning

omos.html - underside der kort beskriver hvem hjemmesidens afsender er

produktdetaljer - detaljer om et valgt produkt

produktliste.html - underside der viser udvalget af produkter, og hvor man inde kan sortere og filtrere

support.html - kontaktformular og relevant information

javascript filer -  er dem der styrer alt det dynamiske indhold på vores sider


# Navngivning
Vi har forsøgt at navngive vores variabler og funktioner, så de er tydelige at forstå. 

Eksempler på navngivning af variabler:

```javascript
const produktliste;
const visantal;
const tilbageknap;
```

Eksempler på funktioner:

```javascript
sorter()
filtrer()
tilbudspris()
```

## Kommentarer i koden
Vi har gjort brug af kommentarer i vores kode, da vi har arbejdet parallelt med kodning delen, og kommentarer har derfor gjort det lettere for alle gruppemedlemmer at forstå hinandens kodnings dele. 
Vi har blandt andet brugt kommentarer i koden hvor vi har brugt fetch og const endpoint, som vist her:
```javascript
// De tre kategorier, vi henter fra DummyJSON
const endpoints = ["https://dummyjson.com/products/category/furniture", "https://dummyjson.com/products/category/home-decoration", "https://dummyjson.com/products/category/kitchen-accessories"];
```

```javascript
// Vi fetcher data fra de tre endpoints
endpoints.forEach((endpoint) => {
  fetch(endpoint)
    .then((res) => res.json())
    .then(visData);
});
```

# Data og JSON-struktur
Vi har hentet vores data ud fra en JSON-fil, som vi har modtaget i undervisningen. Det er en fil der indeholder flere forskellige data bl.a  Recipes, Products, Users. Her valgte vi kategorien products, som indeholdt underkategorierne: furniture, home-decorations og kitchen-accessories, som vi valgte at bruge.

Vi har brugt funktionen fetch i javascript, til at hente vores data, efter vi har defineret vores endpoint ved brug af const i javascript.

## Felter vi fx bruger
title - varens titel

price - varens pris

discountpercentage - varens procent beregnes (i dette tilfælde kun over 10%)

brand - varens brand

thumbnail- varens produktbillede

category - hvilken kategori varen tilhører

# Git og Branches
Vi har til denne opgave brugt git som værktøj til at samarbejde om at kode vores hjemmeside. Vi har igennem hele opgaven arbejdet i branches, dette har vi gjort fordi det har givet os mulighed for at flere medlemmer fra gruppen har kunne arbejde på forskellige dele af hjemmesiden samtidig.

Vi har navngivet vores branches efter hvilken side og hvilke detaljer vi arbejder på. Derefter har vi merget det til main med en kommentar om hvad der er blevet ændret, så de andre gruppemedlemmer kan se ændringerne. 

En branch kan fx have navnet:
- productlist-design-detaljer
- main-css-styling
- productlist-styling
- productlist-setup
- accordion

Vores workflow har derfor været at:
1. opret en branch med et passende navn
2. kod nye tilføjelser/ændringer
3. se resultatet
4. commit med en passende kommentar om hvad der er lavet
5. push og merge til main
Herefter har de resterende gruppemedlemmer kunne trykke pull og derved se ændringerne i main.

# Bæredygtighed
Vi har gjort vores design bæredygtigt da vi har valgt at bruge webp og thumbnail billeder som har en mindre filstørrelse end andre formater og normal størrelse billeder. Dette har vi gjort, da det øger sidens effektivitet og giver en bedre brugeroplevelse.

# Udfordringer
En af vores udfordringer var at få rabat procenterne vist korrekt på produkterne. Da vi brugte Math.round(), oplevede vi at nogle af produkterne kunne fremstå dyrere med rabatten end normalprisen. 
Vi valgte derfor kun at vise tilbudsprisen og rabatprocenten på produkter der har en højere rabat end 10%. Det løste vores problem med de misvisende tilbudspriser.

# Forbedringer
Hvis vi skulle arbejde videre med projektet kunne vi eventuet tilføje:

- søgefunktion så brugerne nemt kan finde et specifikt produkt
- indkøbskurv så brugeren kan tilføje varer til kurven
- flere filtreringsmuligheder så brugeren også kunne vælge mellem mærker

# Gruppemedlemmer
Anna Laursen

Caroline Plahter

Sofie Øer

Carla Zafirakos 




