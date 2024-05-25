'use strict'

document.getElementById('submit-knop').addEventListener("click", controleSubmit);

function antwoordSubmit(event){
    event.preventDefault();
    let antwoord = document.getElementById('antwoord');
    antwoord.innerHTML = `<p>Submitten is gelukt!</p>`;
    antwoord.style.color = "green";
}

function controleSubmit(event){
    let land = document.getElementById('land').value;
    let stad = document.getElementById('stad').value;
    // let beschrijving = document.getElementById('beschrijving-reis').value;
    let cijfer = document.getElementById('reis-cijfer').value;
    event.preventDefault();
    if(land == ""){
        let antwoord = document.getElementById('antwoord');
        antwoord.innerHTML = `<p>Je moet het land van jouw reis nog invullen</p>`;
        antwoord.style.color = "red";
        antwoord.style.textAlign = "center";
    }else if(stad == ""){
        let antwoord = document.getElementById('antwoord');
        antwoord.innerHTML = `<p>Je moet de stad van jouw reis nog invullen</p>`;
        antwoord.style.color = "red";
    }else if(cijfer == ""){
        let antwoord = document.getElementById('antwoord');
        antwoord.innerHTML = `<p>Je moet het cijfer van jouw reis nog invullen</p>`;
        antwoord.style.color = "red";
    }else if(cijfer < 1 || cijfer > 10){
        let antwoord = document.getElementById('antwoord');
        antwoord.innerHTML = `<p>Het cijfer van jouw reis moet tussen 1 en 10 zijn</p>`;
        antwoord.style.color = "red";
    }else{
        antwoordSubmit(event);
    }
}