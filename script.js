'use strict';

// Functie om configuratiegegevens te laden
async function fetchConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// Functie om landen te initialiseren
async function initializeCountries() {
    let countrySelect = document.querySelector('.country');

    try {
        const config = await fetchConfig();
        const response = await fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } });
        const data = await response.json();

        countrySelect.innerHTML = '<option selected>Select Country</option>';
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error initializing countries:', error);
    }
}

// Functie om staten te laden op basis van het geselecteerde land
async function loadStates() {
    const selectedCountryName = document.getElementById('country').value;
    if (!selectedCountryName) return;

    try {
        const config = await fetchConfig();
        const stateSelect = document.querySelector('.state');
        stateSelect.disabled = false;
        stateSelect.innerHTML = '<option selected>Select State</option>';

        const country = await fetchCountryByName(config, selectedCountryName);
        const response = await fetch(`${config.cUrl}/${country.iso2}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } });
        const data = await response.json();

        data.forEach(state => {
            const option = document.createElement('option');
            option.value = state.name;
            option.textContent = state.name;
            stateSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading states:', error);
    }
}

// Functie om steden te laden op basis van het geselecteerde land en staat
async function loadCities() {
    const selectedCountryName = document.getElementById('country').value;
    const selectedStateName = document.getElementById('state').value;
    if (!selectedCountryName || !selectedStateName) return;

    try {
        const config = await fetchConfig();
        const citySelect = document.querySelector('.city');
        citySelect.disabled = false;
        citySelect.innerHTML = '<option selected>Select City</option>';

        const country = await fetchCountryByName(config, selectedCountryName);
        const state = await fetchStateByName(config, country.iso2, selectedStateName);

        const response = await fetch(`${config.cUrl}/${country.iso2}/states/${state.iso2}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } });
        const data = await response.json();

        data.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading cities:', error);
    }
}

// Functie om een reisbeoordeling te maken
function TripReview(country, state, city, description, rating) {
    this.country = country;
    this.state = state;
    this.city = city;
    this.description = description;
    this.rating = rating;
    this.createReview = function(data) {
        [this.country, this.state, this.city, this.description, this.rating] = data;
    }
}

// Functie om een reisbeoordeling in te dienen
function submitResponse(data, event) {
    event.preventDefault();
    let response = document.getElementById('response');
    response.innerHTML = `<p>Submit successful!</p>`;
    response.style.color = "green";
    let tripReview = new TripReview();
    tripReview.createReview(data);
    saveToLocalStorage(data);
    location.reload();
}

// Functie om de reisbeoordeling op te slaan in LocalStorage
function saveToLocalStorage(data) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(data);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Functie om de geschiedenis bij te werken op basis van opgeslagen beoordelingen
function updateHistory() {
    let history = document.getElementById('history-container');
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    history.innerHTML = '';
    reviews.forEach(review => {
        let tripReview = new TripReview();
        tripReview.createReview(review);
        let reviewElement = document.createElement('div');
        reviewElement.innerHTML = `
            <h4>${tripReview.country}: ${tripReview.state}, ${tripReview.city}</h4>
            <p>${tripReview.description}</p>
            <h4>${tripReview.rating}</h4
        `;
        history.appendChild(reviewElement);
    });
}

// Functie om land op te halen op basis van naam
async function fetchCountryByName(config, countryName) {
    const response = await fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } });
    const countries = await response.json();
    return countries.find(country => country.name === countryName);
}

// Functie om staat op te halen op basis van naam
async function fetchStateByName(config, countryIso2, stateName) {
    const response = await fetch(`${config.cUrl}/${countryIso2}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } });
    const states = await response.json();
    return states.find(state => state.name === stateName);
}

// Event listener toevoegen aan de submit-knop
document.getElementById('submit-button').addEventListener("click", (event) => {
    event.preventDefault();
    let country = document.getElementById('country').value;
    let state = document.getElementById('state').value;
    let city = document.getElementById('city').value;
    let description = document.getElementById('trip-description').value;
    let rating = document.getElementById('trip-rating').value;
    let response = document.getElementById('response');

    if (country == "Select Country") {
        response.innerHTML = `<p>You must fill in the country of your trip!</p>`;
        response.style.color = "red";
        response.style.textAlign = "center";
    } else if (state == "Select State") {
        response.innerHTML = `<p>You must fill in the state of your trip!</p>`;
        response.style.color = "red";
    } else if (city == "Select City") {
        response.innerHTML = `<p>You must fill in the city of your trip!</p>`;
        response.style.color = "red";
    } else if (rating == "") {
        response.innerHTML = `<p>You must fill in the rating of your trip!</p>`;
        response.style.color = "red";
    } else if (rating < 1 || rating > 10) {
        response.innerHTML = `<p>The rating of your trip must be between 1 and 10!</p>`;
        response.style.color = "red";
    } else {
        let data = [country, state, city, description, rating];
        submitResponse(data, event);
    }
});

// Functie om de pagina-inhoud te initialiseren bij het laden van de pagina
window.onload = function() {
    initializeCountries();
    updateHistory();
}