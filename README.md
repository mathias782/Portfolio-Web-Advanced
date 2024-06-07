# Portfolio Web Advanced

## Travel Review Project

Dit project is een webapplicatie waarmee gebruikers hun reiservaringen kunnen indienen en eerdere beoordelingen kunnen bekijken.

## Gebruikte onderwerpen

### Elementen selecteren
- `document.querySelector('.country')` in `initializeCountries` - `script.js`, lijn 8
- `document.getElementById('country')` in `loadStates` - `script.js`, lijn 25
- `document.querySelector('.state')` in `loadStates` - `script.js`, lijn 28
- `document.getElementById('state')` in `loadCities` - `script.js`, lijn 44
- `document.querySelector('.city')` in `loadCities` - `script.js`, lijn 47
- `document.getElementById('submit-button')` in de event listener - `script.js`, lijn 111
- `document.getElementById('response')` in `submitResponse` en de validatie - `script.js`, lijnen 68, 116, 121, 125, 129

### Elementen manipuleren
- `countrySelect.innerHTML = '<option selected>Select Country</option>'` in `initializeCountries` - `script.js`, lijn 11
- `stateSelect.disabled = false` en `stateSelect.innerHTML = '<option selected>Select State</option>'` in `loadStates` - `script.js`, lijn 28-29
- `citySelect.disabled = false` en `citySelect.innerHTML = '<option selected>Select City</option>'` in `loadCities` - `script.js`, lijn 47-48
- `response.innerHTML = '<p>Submit successful!</p>'` en `response.style.color = "green"` in `submitResponse` - `script.js`, lijn 69-70
- `response.innerHTML` en `response.style.color` in de validatie - `script.js`, lijnen 117, 122, 126, 130
- `history.innerHTML = ''` in `updateHistory` - `script.js`, lijn 84
- `reviewElement.innerHTML = ...` in `updateHistory` - `script.js`, lijnen 89-93

### Event aan een element koppelen
- `document.getElementById('submit-button').addEventListener("click", ...)` voor de submit knop - `script.js`, lijn 111
- `document.getElementById('country').addEventListener('change', ...)` voor het selecteren van een land - `script.js`, lijn 135
- `document.addEventListener("DOMContentLoaded", async function() { ... })` voor het laden van de pagina - `script.js`, lijn 137

### Formulier valideren
- Validatie van `country`, `state`, `city`, en `rating` in de event listener voor de submit knop - `script.js`, lijnen 113-131

### Gebruiken van een constante
- `const countries = data.map(country => country.name)` in `initializeCountries` - `script.js`, lijn 19
- `const config = await fetchConfig()` in meerdere functies - `script.js`, lijnen 6, 24, 27, 43, 46, 60, 105, 108, 144, 147, 155

### Gebruiken van template literals
- `response.innerHTML = \`<p>Submit successful!</p>\`` in `submitResponse` - `script.js`, lijn 69
- `response.innerHTML = \`<p>You must fill in the country of your trip!</p>\`` en andere validatieberichten - `script.js`, lijnen 117, 122, 126, 130
- `reviewElement.innerHTML = \`
    <h4>\${tripReview.country}: \${tripReview.state}, \${tripReview.city}</h4>
    <p>\${tripReview.description}</p>
    <h4>\${tripReview.rating}</h4>
\`` in `updateHistory` - `script.js`, lijnen 89-93

### Destructuring
- `[this.country, this.state, this.city, this.description, this.rating] = data` in `TripReview.createReview` - `script.js`, lijn 65

### Spread & Rest operator
- `function submitResponse(event, ...data)` - `script.js`, lijn 66
- `submitResponse(event, ...[country, state, city, description, rating])` - `script.js`, lijn 132
- `updateHistory(...countries)` in de self-executing function - `script.js`, lijn 150

### Iteration over een array
- `data.forEach(country => { ... })` in `initializeCountries` - `script.js`, lijn 13
- `data.forEach(state => { ... })` in `loadStates` - `script.js`, lijn 34
- `data.forEach(city => { ... })` in `loadCities` - `script.js`, lijn 53
- `reviews.forEach(review => { ... })` in `updateHistory` - `script.js`, lijn 86
- `countries.find(country => country.name === countryName)` in `fetchCountryByName` - `script.js`, lijn 101
- `states.find(state => state.name === stateName)` in `fetchStateByName` - `script.js`, lijn 108

### Arrow function
- `document.getElementById('country').addEventListener('change', () => { ... })` - `script.js`, lijn 135

### Callback function
- `loadStates(callback)` - `script.js`, lijn 24
- `promise.then(callback)` in `loadStates` en `loadCities` - `script.js`, lijnen 40, 59
- `document.getElementById('country').addEventListener('change', () => { loadStates(() => { updateHistory(); }) })` - `script.js`, lijn 135

### Promise
- `const promise = new Promise((resolve, reject) => { ... })` in `loadStates` en `loadCities` - `script.js`, lijnen 33, 52
- `promise.then(callback)` in `loadStates` en `loadCities` - `script.js`, lijnen 40, 59

### Consumer methods
- `fetchConfig().then(config => { ... })` in meerdere functies - `script.js`, lijnen 6, 24, 27, 43, 46, 60, 105, 108, 144, 147, 155

### Async & Await
- `async function fetchConfig() { ... }` - `script.js`, lijn 2
- `async function initializeCountries() { ... }` - `script.js`, lijn 7
- `async function loadStates(callback) { ... }` - `script.js`, lijn 23
- `async function loadCities(callback) { ... }` - `script.js`, lijn 42
- `async function fetchCountryByName(config, countryName) { ... }` - `script.js`, lijn 98
- `async function fetchStateByName(config, countryIso2, stateName) { ... }` - `script.js`, lijn 105
- `document.addEventListener("DOMContentLoaded", async function() { ... })` in de self-executing function - `script.js`, lijn 137

### Self executing function
- `(function() { document.addEventListener("DOMContentLoaded", async function() { ... }) })()` - `script.js`, lijnen 136-150

### Fetch om data op te halen
- `const response = await fetch('config.json')` in `fetchConfig` - `script.js`, lijn 3
- `const response = await fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } })` in `initializeCountries`, `fetchCountryByName` - `script.js`, lijnen 10, 99
- `const response = await fetch(`${config.cUrl}/${country.iso2}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })` in `loadStates`, `fetchStateByName` - `script.js`, lijnen 30, 106
- `const response = await fetch(`${config.cUrl}/${country.iso2}/states/${state.iso2}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } })` in `loadCities` - `script.js`, lijn 49

### JSON manipuleren en weergeven
- `const config = await response.json()` in `fetchConfig` - `script.js`, lijn 4
- `const data = await response.json()` in `initializeCountries`, `loadStates`, `loadCities` - `script.js`, lijnen 12, 32, 51
- `const countries = await response.json()` in `fetchCountryByName` - `script.js`, lijn 100
- `const states = await response.json()` in `fetchStateByName` - `script.js`, lijn 107
- `let reviews = JSON.parse(localStorage.getItem('reviews')) || []` in `saveToLocalStorage`, `updateHistory` - `script.js`, lijnen 75, 83

### Basis CSS Animatie
- `@keyframes colorChange { ... }` - `index.css`, lijnen 108-113
- `animation: colorChange 2s ease-in-out alternate infinite;` in `header`, `#submit-button` - `index.css`, lijnen 115, 135

### Gebruik van een flexbox of CSS grid
- `display: grid;` in de `body` CSS-regel - `index.css`, lijn 8
- `display: flex;` in de `#travel-form`, `main`, en `#travel-form div` CSS-regels - `index.css`, lijnen 45, 58, 64

### Gebruik van LocalStorage
- `let reviews = JSON.parse(localStorage.getItem('reviews')) || []` in `saveToLocalStorage`, `updateHistory` - `script.js`, lijnen 75, 83
- `localStorage.setItem('reviews', JSON.stringify(reviews))` in `saveToLocalStorage` - `script.js`, lijn 77

## Bestanden

- `index.html`: HTML-structuur van de applicatie.
- `script.js`: Bevat de JavaScript-logica voor het verwerken van formulierindiening, ophalen van gegevens en bijwerken van de geschiedenis.
- `index.css`: Bevat de CSS-stijlen voor de applicatie.
- `config.json`: Bevat de configuratie voor de API URL en sleutel.
