// TRACCIA:
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// SVOLGIMENTO:

/********************************
 *                              *
 *           ON LOAD            *
 *                              *
 *******************************/

// Recupero tag button dall'HTML
const playGame = document.getElementById("play_game");
// Imposto variabili dimensioni griglia a seconda della difficolà
let dimensionHardGrid = 49;
let dimensionMediumGrid = 81;
let dimensionEasyGrid = 100;

/********************************
 *                              *
 *           ON CLICK           *
 *                              *
 *******************************/

// Genero evento al click del button
playGame.addEventListener(
    "click",
    function () {
        // Recupero il valore della difficoltà scelta dall'utente
        const userInputDifficult = document.getElementById("difficult");
        const gameDifficult = userInputDifficult.value;
        // Recupero il tag div grid dall'HTML
        const gridEl = document.getElementById("grid");

        let dimensionGridEl;

        // Cambia griglia a seconda della difficoltà scelta dall'utente
        if (gameDifficult == "medium") {
            dimensionGridEl = dimensionMediumGrid;
            generateGrid(gridEl, dimensionGridEl);
        } else if (gameDifficult == "hard") {
            dimensionGridEl = dimensionHardGrid;
            generateGrid(gridEl, dimensionGridEl);
        } else {
            dimensionGridEl = dimensionEasyGrid;
            generateGrid(gridEl, dimensionGridEl);
        }

    }
);

/********************************
 *                              *
 *           FUNCTIONS          *
 *                              *
 *******************************/

/**
 * funzione che genera una griglia di quadrati dato l'elemento griglia e il numero di quadrati
 * 
 * @param {*} grid l'elemento griglia
 * @param {int} dimensionGrid il numero di quadrati totali della griglia che può cambiare a seconda della difficoltà
 */

function generateGrid(grid, dimensionGrid) {
    // Resettare grid in condizione di start
    grid.innerHTML = "";
    // Creo il ciclo che andrà a generare n div con classe square
    for (let i = 0; i < dimensionGrid; i++) {
        const numberSquare = i + 1;
        const squareEl = document.createElement("div");
        //Imposto condizioni che determinano la grandezza della griglia a seconda della difficoltà 
        if (dimensionGrid == dimensionHardGrid) {
            squareEl.classList.add("square");
            squareEl.classList.add("square-hard");
        } else if (dimensionGrid == dimensionMediumGrid) {
            squareEl.classList.add("square");
            squareEl.classList.add("square-medium");
        } else {
            squareEl.classList.add("square");
        }
        // Scrivo numero all'interno del quadrato
        squareEl.innerHTML = numberSquare;
        // Aggiungo evento al click del quadrato
        squareEl.addEventListener(
            "click",
            function () {
                this.classList.toggle("active");
                console.log(numberSquare);
            }
        );
        // Aggiungo elemento square all'elemento grid
        grid.append(squareEl);
    }
}