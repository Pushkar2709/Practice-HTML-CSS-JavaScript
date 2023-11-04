const gridElement = document.getElementById("grid");
const minesLeftElement = document.getElementById("minesLeft");
const resultElement = document.getElementById("result");

const numRow = 8;
const numCol = 8;
const numMines = 10;

const visitedBlocks = [];
const minefield = generateField();
const blockElements = [];
let firstClick = true;
let minesLeft = numMines;
let openedBlocks = 0;
let gameOver = false;

displayField();

function generateField() {
    const grid = [];
    for (let i=0;i<numRow;i++) {
        const row = [];
        const visitedRow = [];
        for (let j=0;j<numCol;j++) {
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
        const x = Math.floor(Math.random()*numRow);
        const y = Math.floor(Math.random()*numCol);
        if (Math.abs(x - excludeX) > 1 || Math.abs(y - excludeY) > 1) {
            if (minefield[x][y] !== -1) {
                minefield[x][y] = -1;
                mines.push([x, y]);
                temp--;
            }
        }
    }
    const t = [-1, 0, 1];
    mines.forEach(([x, y]) => {
        for (let i=0;i<3;i++) {
            for (let j=0;j<3;j++) {
                if ((x+t[i] >= 0 && x+t[i] < numRow) && (y+t[j] >= 0 && y+t[j] < numCol)) {
                    if (minefield[x+t[i]][y+t[j]] !== -1) {
                        minefield[x+t[i]][y+t[j]]++;
                    }
                }
            }
        }
    })
}

function displayField() {
    for (let i=0;i<minefield.length;i++) {
        const gridRowElement = document.createElement("div");
        gridRowElement.id = "gridRow";
        const blockElementsRow = [];
        for (let j=0;j<minefield[0].length;j++) {
            const blockElement = document.createElement("div");
            blockElement.id = "block";
            blockElement.row = i;
            blockElement.column = j;
            blockElement.classList.toggle("hidden");
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
                        e.target.innerHTML = minefield[x][y];
                        e.target.classList.toggle("red-font");
                        gameOver = true;
                        resultElement.innerHTML = "YOU LOSE!!";
                    }
                } else {
                    openBlock(x, y);
                    if (openedBlocks === (numRow * numCol) - numMines) {
                        gameOver = true;
                        resultElement.innerHTML = "WINNER!!";
                    }
                }
            })
            blockElement.addEventListener("contextmenu", (e) => {
                if (gameOver) return;
                if (e.target.classList.contains("hidden")) {
                    e.target.classList.toggle("flag");
                    if (e.target.classList.contains("flag")) {
                        minesLeft--;
                    } else {
                        minesLeft++;
                    }
                }
                minesLeftElement.innerHTML = "Mines Left: " + minesLeft;
            });
            gridRowElement.appendChild(blockElement);
            blockElementsRow.push(blockElement);
        }
        gridElement.appendChild(gridRowElement);
        blockElements.push(blockElementsRow);
    }
    minesLeftElement.innerHTML = "Mines Left: " + minesLeft;
}

function openBlock(x, y) {
    console.log(x, y);
    if (x < 0 || x >= numRow) return;
    if (y < 0 || y >= numCol) return;
    if (minefield[x][y] === -1) return;
    if (visitedBlocks[x][y]) return;
    if (!blockElements[x][y].classList.contains("flag")) {
        blockElements[x][y].classList.remove("hidden");
        blockElements[x][y].innerHTML = minefield[x][y] === 0 ? "" : minefield[x][y];
        visitedBlocks[x][y] = true;
        openedBlocks++;
        if (minefield[x][y] === 0) {
            const t = [-1, 0, 1];
            for (let i=0;i<3;i++) {
                for (let j=0;j<3;j++) {
                    openBlock(x+t[i], y+t[j]);
                }
            }
        }
    }
}

window.oncontextmenu = () => {
    return false;
}