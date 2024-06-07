'use strict';

async function fetchConfig() {
    try {
        // Fetch om data op te halen
        const response = await fetch('config.json');
        // JSON manipuleren en weergeven
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('Error loading config:', error);
        throw error;
    }
}

async function initializeCountries() {
    // Elementen selecteren
    let countrySelect = document.querySelector('.country');
    try {
        const config = await fetchConfig();
        // Fetch om data op te halen
        const response = await fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } });
        // JSON manipuleren en weergeven
        const data = await response.json();
        // Elementen manipuleren
        countrySelect.innerHTML = '<option selected>Select Country</option>';
        // Iteration over een array
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });
        // Gebruiken van een constante
        const countries = data.map(country => country.name);
        return countries;
    } catch (error) {
        console.error('Error initializing countries:', error);
        throw error;
    }
}

async function loadStates(callback) {
    // Elementen selecteren
    const selectedCountryName = document.getElementById('country').value;
    if (!selectedCountryName) return;
    try {
        const config = await fetchConfig();
        // Elementen selecteren en manipuleren
        const stateSelect = document.querySelector('.state');
        stateSelect.disabled = false;
        stateSelect.innerHTML = '<option selected>Select State</option>';
        // Fetch om data op te halen
        const country = await fetchCountryByName(config, selectedCountryName);
        const response = await fetch(`${config.cUrl}/${country.iso2}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } });
        // JSON manipuleren en weergeven
        const data = await response.json();
        // Promise
        const promise = new Promise((resolve, reject) => {
            data.forEach(state => {
                const option = document.createElement('option');
                option.value = state.name;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
            resolve();
        });
        // Callback function
        promise.then(callback);
    } catch (error) {
        console.error('Error loading states:', error);
    }
}

async function loadCities(callback) {
    // Elementen selecteren
    const selectedCountryName = document.getElementById('country').value;
    const selectedStateName = document.getElementById('state').value;
    if (!selectedCountryName || !selectedStateName) return;
    try {
        const config = await fetchConfig();
        // Elementen selecteren en manipuleren
        const citySelect = document.querySelector('.city');
        citySelect.disabled = false;
        citySelect.innerHTML = '<option selected>Select City</option>';
        // Fetch om data op te halen
        const country = await fetchCountryByName(config, selectedCountryName);
        const state = await fetchStateByName(config, country.iso2, selectedStateName);
        const response = await fetch(`${config.cUrl}/${country.iso2}/states/${state.iso2}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } });
        // JSON manipuleren en weergeven
        const data = await response.json();
        // Promise
        const promise = new Promise((resolve, reject) => {
            data.forEach(city => {
                const option = document.createElement('option');
                option.value = city.name;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });
            resolve();
        });
        // Callback function
        promise.then(callback);
    } catch (error) {
        console.error('Error loading cities:', error);
    }
}

function TripReview(country, state, city, description, rating) {
    this.country = country;
    this.state = state;
    this.city = city;
    this.description = description;
    this.rating = rating;
    this.createReview = function(data) {
        // Destructuring
        [this.country, this.state, this.city, this.description, this.rating] = data;
    }
}

function submitResponse(event, ...data) {
    // Event aan een element koppelen
    event.preventDefault();
    // Elementen selecteren en manipuleren
    let response = document.getElementById('response');
    response.innerHTML = `<p>Submit successful!</p>`;
    response.style.color = "green";
    let tripReview = new TripReview();
    tripReview.createReview(data);
    saveToLocalStorage(data);
    location.reload();
}

function saveToLocalStorage(data) {
    // JSON manipuleren en weergeven
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(data);
    // Gebruik van LocalStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function updateHistory() {
    // Elementen selecteren en manipuleren
    let history = document.getElementById('history-container');
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    history.innerHTML = '';
    // Iteration over een array
    reviews.forEach(review => {
        let tripReview = new TripReview();
        tripReview.createReview(review);
        let reviewElement = document.createElement('div');
        // Gebruiken van template literals
        reviewElement.innerHTML = `
            <h4>${tripReview.country}: ${tripReview.state}, ${tripReview.city}</h4>
            <p>${tripReview.description}</p>
            <h4>${tripReview.rating}</h4>
        `;
        history.appendChild(reviewElement);
    });
}

// Fetch om data op te halen
async function fetchCountryByName(config, countryName) {
    const response = await fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } });
    const countries = await response.json();
    // Iteration over een array
    return countries.find(country => country.name === countryName);
}

// Fetch om data op te halen
async function fetchStateByName(config, countryIso2, stateName) {
    const response = await fetch(`${config.cUrl}/${countryIso2}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } });
    const states = await response.json();
    // Iteration over een array
    return states.find(state => state.name === stateName);
}

// Event aan een element koppelen
document.getElementById('submit-button').addEventListener("click", (event) => {
    // Formulier valideren
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
    } else if(city == "Select City") {
        response.innerHTML = `<p>You must fill in the city of your trip!</p>`;
        response.style.color = "red";
    } else if (!rating) {
        response.innerHTML = `<p>You must fill in the rating of your trip!</p>`;
        response.style.color = "red";
    } else {
        // Spread & Rest operator
        submitResponse(event, ...[country, state, city, description, rating]);
    }
});

// Event aan een element koppelen
document.getElementById('country').addEventListener('change', () => {
    // Arrow function en Callback function
    loadStates(() => {
        updateHistory();
    });
});

// Self executing function
(function() {
    // Event aan een element koppelen
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            // Async & Await
            const countries = await initializeCountries();
            // Spread & Rest operator en Consumer methods (spread operator gebruikt binnen updateHistory)
            updateHistory(...countries);
        } catch (error) {
            console.error('Error initializing countries and updating history:', error);
        }
    });
})();