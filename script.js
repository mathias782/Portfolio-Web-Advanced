'use strict'

document.getElementById('reis-form').addEventListener("submit", antwoordSubmit);

function antwoordSubmit(event){
    event.preventDefault();
    let antwoord = document.getElementById('antwoord');
    const html = `<p>Submitten is gelukt!</p>`;
    antwoord.innerHTML = html;
    antwoord.style.color = "green";
}