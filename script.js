'use strict';

var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}


var countrySelect = document.querySelector('.country'),
    stateSelect = document.querySelector('.state'),
    citySelect = document.querySelector('.city')


function loadCountries() {

    let apiEndPoint = config.cUrl

    fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(Response => Response.json())
    .then(data => {

        data.forEach(country => {
            const option = document.createElement('option')
            option.value = country.iso2
            option.textContent = country.name 
            countrySelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))

    stateSelect.disabled = true
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'none'
    citySelect.style.pointerEvents = 'none'
}


function loadStates() {
    stateSelect.disabled = false
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'auto'
    citySelect.style.pointerEvents = 'none'

    const selectedCountryCode = countrySelect.value
    // console.log(selectedCountryCode);
    stateSelect.innerHTML = '<option value="">Select State</option>' // for clearing the existing states
    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(state => {
            const option = document.createElement('option')
            option.value = state.iso2
            option.textContent = state.name 
            stateSelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))
}


function loadCities() {
    citySelect.disabled = false
    citySelect.style.pointerEvents = 'auto'

    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;

    citySelect.innerHTML = '<option value="">Select City</option>';

    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(city => {
            const option = document.createElement('option')
            option.value = city.iso2
            option.textContent = city.name 
            citySelect.appendChild(option)
        })
    })
}

window.onload = loadCountries

function ReisBeoordeling(land, stad, beschrijving, cijfer){
    this.land = land;
    this.stad = stad;
    this.beschrijving = beschrijving;
    this.cijfer = cijfer;
    this.maakBeoordeling = function(data){
        [this.land, this.stad, this.beschrijving, this.cijfer] = data;
    }
}

document.getElementById('submit-knop').addEventListener("click", (event) =>{
    event.preventDefault();
    let land = document.getElementById('land').value;
    let stad = document.getElementById('stad').value;
    let beschrijving = document.getElementById('beschrijving-reis').value;
    let cijfer = document.getElementById('reis-cijfer').value;
    if(land == ""){
        let antwoord = document.getElementById('antwoord');
        antwoord.innerHTML = `<p>Je moet het land van jouw reis nog invullen!</p>`;
        antwoord.style.color = "red";
        antwoord.style.textAlign = "center";
    }else if(stad == ""){
        let antwoord = document.getElementById('antwoord');
        antwoord.innerHTML = `<p>Je moet de stad van jouw reis nog invullen!</p>`;
        antwoord.style.color = "red";
    }else if(cijfer == ""){
        let antwoord = document.getElementById('antwoord');
        antwoord.innerHTML = `<p>Je moet het cijfer van jouw reis nog invullen!</p>`;
        antwoord.style.color = "red";
    }else if(cijfer < 1 || cijfer > 10){
        let antwoord = document.getElementById('antwoord');
        antwoord.innerHTML = `<p>Het cijfer van jouw reis moet tussen 1 en 10 zijn!</p>`;
        antwoord.style.color = "red";
    }else{
        let data = [];
        data.push(land);
        data.push(stad);
        data.push(beschrijving);
        data.push(cijfer);
        antwoordSubmit(data, event);
    }
});

function antwoordSubmit(data, event){
    event.preventDefault();
    let antwoord = document.getElementById('antwoord');
    antwoord.innerHTML = `<p>Submitten is gelukt!</p>`;
    antwoord.style.color = "green";
    let reisBeoordeling = new ReisBeoordeling();
    reisBeoordeling.maakBeoordeling(data);
    let geschiedenis = document.getElementById('geschiedenis-container');
    geschiedenis.innerHTML = `
        <h4>${reisBeoordeling.land}: ${reisBeoordeling.stad}</h4>
        <p>${reisBeoordeling.beschrijving}</p>
        <h4>${reisBeoordeling.cijfer}</h4>
    `;
}