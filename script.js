'use strict'

document.getElementById('reis-form').addEventListener("submit", antwoordSubmit);

function antwoordSubmit(event){
    event.preventDefault();
    let antwoord = document.getElementById('antwoord');
    antwoord.innerHTML = `<p>submitten is gelukt!</p>`;
}