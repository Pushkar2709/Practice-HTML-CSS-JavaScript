const gridElement = document.getElementById("grid");
const minesLeftElement = document.getElementById("minesLeft");
const resultElement = document.getElementById("result");
const difficultySelectorElement = document.getElementById("difficulty");

let numRow = 8;
let numCol = 8;
let numMines = 10;

let visitedBlocks = [];
let minefield = generateField();
let blockElements = [];
let firstClick = true;
let minesLeft = numMines;
let openedBlocks = 0;
let gameOver = false;
let difficulty = "beginner";

const t = [-1, 0, 1];

displayField();

function generateField() {
    const grid = [];
    for (let i = 0; i < numRow; i++) {
        const row = [];
        const visitedRow = [];
        for (let j = 0; j < numCol; j++) {
            row.push(0);
            visitedRow.push(false);
        }
        grid.push(row);
        visitedBlocks.push(visitedRow);
    }
    return grid;
}

function populateField(excludeX, excludeY) {
    let temp = numMines;
    const mines = [];
    while (temp > 0) {
        const x = Math.floor(Math.random() * numRow);
        const y = Math.floor(Math.random() * numCol);
        if (Math.abs(x - excludeX) > 1 || Math.abs(y - excludeY) > 1) {
            if (minefield[x][y] !== -1) {
                minefield[x][y] = -1;
                mines.push([x, y]);
                temp--;
            }
        }
    }
    mines.forEach(([x, y]) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((x + t[i] >= 0 && x + t[i] < numRow) && (y + t[j] >= 0 && y + t[j] < numCol)) {
                    if (minefield[x + t[i]][y + t[j]] !== -1) {
                        minefield[x + t[i]][y + t[j]]++;
                    }
                }
            }
        }
    })
}

function displayField() {
    gridElement.innerHTML = "";
    resultElement.innerHTML = "Result";
    resultElement.style.color = "burlywood";
    for (let i = 0; i < minefield.length; i++) {
        const gridRowElement = document.createElement("div");
        gridRowElement.classList.toggle("gridRow");
        const blockElementsRow = [];
        for (let j = 0; j < minefield[0].length; j++) {
            const blockElement = document.createElement("div");
            blockElement.row = i;
            blockElement.column = j;
            blockElement.classList.toggle("block");
            blockElement.classList.toggle("hidden");
            blockElement.classList.toggle(`${difficulty}-block-size`);
            blockElement.addEventListener("click", (e) => {
                if (gameOver) return;
                const x = e.target.row;
                const y = e.target.column;
                if (firstClick) {
                    populateField(x, y);
                    firstClick = false;
                }
                if (minefield[x][y] === -1) {
                    if (!e.target.classList.contains("flag")) {
                        e.target.classList.remove("hidden");
                        e.target.classList.toggle("bomb");
                        gameOver = true;
                        resultElement.innerHTML = "YOU LOST!!";
                        resultElement.style.color = "red";
                    }
                } else {
                    openBlock(x, y);
                    visitedBlocks = [];
                    for (let i = 0; i < numRow; i++) {
                        const visitedRow = [];
                        for (let j = 0; j < numCol; j++) {
                            visitedRow.push(false);
                        }
                        visitedBlocks.push(visitedRow);
                    }
                    if (!e.target.classList.contains("hidden")) {
                        autoFlag(x, y);
                    }
                    if (openedBlocks === (numRow * numCol) - numMines) {
                        gameOver = true;
                        resultElement.innerHTML = "WINNER!!";
                        resultElement.style.color = "green";
                    }
                }
            })
            blockElement.addEventListener("contextmenu", (e) => {
                if (gameOver || firstClick) return;
                if (e.target.classList.contains("hidden")) {
                    e.target.classList.add("flag");
                    e.target.classList.remove("hidden");
                    minesLeft--;
                } else if (e.target.classList.contains("flag")) {
                    e.target.classList.remove("flag");
                    e.target.classList.add("hidden");
                    minesLeft++;
                }
                minesLeftElement.innerHTML = minesLeft;
            });
            gridRowElement.appendChild(blockElement);
            blockElementsRow.push(blockElement);
        }
        gridElement.appendChild(gridRowElement);
        blockElements.push(blockElementsRow);
    }
    minesLeftElement.innerHTML = minesLeft;
}

function openBlock(x, y) {
    if (x < 0 || x >= numRow) return;
    if (y < 0 || y >= numCol) return;
    if (minefield[x][y] === -1) return;
    if (visitedBlocks[x][y]) return;
    if (!blockElements[x][y].classList.contains("flag")) {
        if (blockElements[x][y].classList.contains("hidden")) {
            openedBlocks++;
        }
        blockElements[x][y].classList.remove("hidden");
        visitedBlocks[x][y] = true;
        let flaggedBlocks = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((x + t[i] >= 0 && x + t[i] < numRow) && (y + t[j] >= 0 && y + t[j] < numCol)) {
                    if (blockElements[x + t[i]][y + t[j]].classList.contains("flag")) {
                        flaggedBlocks++;
                    }
                }
            }
        }
        if (minefield[x][y] === flaggedBlocks) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    openBlock(x + t[i], y + t[j]);
                }
            }
        }
    } else {
        blockElements[x][y].classList.remove("flag");
        blockElements[x][y].classList.toggle("red-background");
        gameOver = true;
        resultElement.innerHTML = "YOU LOST!!";
        resultElement.style.color = "red";
    }
    blockElements[x][y].innerHTML = minefield[x][y] === 0 ? "" : minefield[x][y];
}

function autoFlag(x, y) {
    let hiddenBlocks = 0, flaggedBlocks = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((x + t[i] >= 0 && x + t[i] < numRow) && (y + t[j] >= 0 && y + t[j] < numCol)) {
                if (blockElements[x + t[i]][y + t[j]].classList.contains("hidden")) {
                    hiddenBlocks++;
                }
                if (blockElements[x + t[i]][y + t[j]].classList.contains("flag")) {
                    flaggedBlocks++;
                }
            }
        }
    }
    if (hiddenBlocks === minefield[x][y] - flaggedBlocks) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((x + t[i] >= 0 && x + t[i] < numRow) && (y + t[j] >= 0 && y + t[j] < numCol)) {
                    if (blockElements[x + t[i]][y + t[j]].classList.contains("hidden")) {
                        blockElements[x + t[i]][y + t[j]].classList.toggle("flag");
                        blockElements[x + t[i]][y + t[j]].classList.toggle("hidden");
                        if (blockElements[x + t[i]][y + t[j]].classList.contains("flag")) {
                            minesLeft--;
                        } else {
                            minesLeft++;
                        }
                    }
                }
            }
        }
    }
    minesLeftElement.innerHTML = minesLeft;
}

const reset = () => {
    difficulty = difficultySelectorElement.value;
    if (difficulty === "beginner") {
        numRow = numCol = 8;
        numMines = 10;
    } else if (difficulty === "intermediate") {
        numRow = numCol = 16;
        numMines = 40;
    } else {
        numRow = 16;
        numCol = 30;
        numMines = 99;
    }
    visitedBlocks = [];
    minefield = generateField();
    blockElements = [];
    firstClick = true;
    minesLeft = numMines;
    openedBlocks = 0;
    gameOver = false;
    displayField();
}

window.oncontextmenu = () => {
    return false;
}