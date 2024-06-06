'use strict'

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