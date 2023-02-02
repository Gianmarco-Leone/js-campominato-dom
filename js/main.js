// TRACCIA:

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti(ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.
// SUPERBONUS 1
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
// SUPERBONUS 2
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.



// SVOLGIMENTO:

/********************************
 *                              *
 *           ON LOAD            *
 *                              *
 *******************************/

// Recupero tag button dall'HTML
const playGame = document.getElementById("play_game");
// Imposto variabili globali
let dimensionHardGrid = 49;
let dimensionMediumGrid = 81;
let dimensionEasyGrid = 100;
let bombList;

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
            generateBombList(dimensionMediumGrid);
        } else if (gameDifficult == "hard") {
            dimensionGridEl = dimensionHardGrid;
            generateGrid(gridEl, dimensionGridEl);
            generateBombList(dimensionHardGrid);
        } else {
            dimensionGridEl = dimensionEasyGrid;
            generateGrid(gridEl, dimensionGridEl);
            generateBombList(dimensionEasyGrid);
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
 * @param {HTMLElement} grid l'elemento griglia
 * @param {int} dimensionGrid il numero di quadrati totali della griglia che può cambiare a seconda della difficoltà
 */

function generateGrid(grid, dimensionGrid) {
    // Resettare grid in condizione di start
    grid.innerHTML = "";

    let gameOver = false;

    let points = 0;

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
                if (!gameOver) {
                    if (bombList.includes(numberSquare)) {
                        this.classList.add("square-bomb");
                        userPoint("game-result", "Hai calpestato una bomba, hai totalizzato " + points + " punti.")
                        gameOver = true;
                        selectAllBombs(bombList, "square-bomb");
                    } else {
                        this.classList.add("active");
                        points++;
                        userPoint("game-result", "Il tuo punteggio è " + points);
                        if (points == (parseInt(dimensionGrid - 16))) {
                            userPoint("game-result", "COMPLIMENTI, HAI VINTO!")
                            gameOver = true;
                        }
                    }
                }
            },
            { once: true }
        );
        // Aggiungo elemento square all'elemento grid
        grid.append(squareEl);
    }
}


/**
 * funzione che genera un numero random dati i valori del range minimo e del range massimom
 * 
 * @param {int} minimo valore range minimo
 * @param {int} massimo valore range massimo
 */

function generateRandomNumber(minimo, massimo) {
    let randomNumber = Math.floor(Math.random() * (massimo - minimo + 1)) + minimo;
    return randomNumber;
}


/**
 * funzione che genera la lista di tutte le bombe a seconda della dimensione della griglia per identificare il range massimo
 * 
 * @param {int} dimensionGrid numero che indica la dimensione totale della griglia e rappresenta il range massimo della lista bombe di gioco
 * @returns {Array} lista bombe 
 */

function generateBombList(dimensionGrid) {
    bombList = [];
    let numberBomb;
    while (bombList.length < 16) {
        numberBomb = generateRandomNumber(1, dimensionGrid);
        if (!bombList.includes(numberBomb)) {
            bombList.push(numberBomb);
        }
    }
    console.log(bombList);
    return bombList;
}


/**
 * funzione che scrive in un elemento html una stringa
 * 
 * @param {HTMLElement} idElement elemento da recuperare 
 * @param {strg} strg frase da scrivere nell'elemento  
 */

function userPoint(idElement, strg) {
    document.getElementById(idElement).innerHTML = strg;
}


/**
 * funzione che seleziona tutti gli elementi bomba dalla lista bombe individuati dalla classe css
 * 
 * @param {Array} bombList lista dalla quale recuperare elementi bombe 
 * @param {strg} addClass selettore classe css necessario per richiamare elementi  
 */

function selectAllBombs(bombList, addClass) {
    const allSquare = grid.children;
    for (let i = 0; i < allSquare.length; i++) {
        if (bombList.includes(parseInt(allSquare[i].innerHTML))) {
            allSquare[i].classList.add(addClass)
        }
    }
}