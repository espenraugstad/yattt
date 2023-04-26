/* const rows = document.querySelectorAll("tr");
//console.log(rows);

const cells = document.querySelectorAll("td");
console.log(cells); */

tbod = document.querySelector("tbody");
const info = document.getElementById("info");

const playerA = "X";
const playerB = "O";

const playerAvalue = 1;
const playerBvalue = -1;

let activePlayer = playerAvalue;
let isPlaying = true;

const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

// Create the board
for (let [ridx, row] of board.entries()) {
  // Create new table row
  const tr = document.createElement("tr");
  for (let [cidx, col] of board[ridx].entries()) {
    // Create table cell
    const td = document.createElement("td");
    td.setAttribute("id", `${ridx}:${cidx}`);

    // Add eventlistener for click
    td.addEventListener("click", (e) => {
      selectCell(e);
    });

    tr.appendChild(td);
  }
  tbod.appendChild(tr);
}

function selectCell(e) {
  if (isPlaying) {
    let [rowS, colS] = e.target.id.split(":");
    let row = parseInt(rowS);
    let col = parseInt(colS);

    if (board[row][col] === 0) {
      activePlayer === 1
        ? (e.target.innerHTML = "X")
        : (e.target.innerHTML = "O");
      board[row][col] = activePlayer;
      let gameover = checkVictory();
      if (!gameover) {
        activePlayer *= -1;
        activePlayer === 1
          ? (info.innerHTML = `X goes next`)
          : (info.innerHTML = `O goes next`);
      } else {
        isPlaying = false;
      }
    }
  }
}

function checkVictory() {
  let winner = "";
  // Rows
  for (const row of board) {
    const sum = row.reduce((acc, cur) => acc + cur, 0);

    if (sum === 3) {
      winner = "X";
    }

    if (sum === -3) {
      winner = "O";
    }
  }

  // Cols
  // Transpose board
  let boardT = board[0].map((x, i) => board.map((x) => x[i]));
  for (const rowT of boardT) {
    const sumT = rowT.reduce((acc, cur) => acc + cur, 0);
    if (sumT === 3) {
      winner = "X";
    }
    if (sumT === -3) {
      winner = "O";
    }
  }

  // Diags
  let sumLR = 0;
  let sumRL = 0;
  for (let i = 0; i < board.length; i++) {
    sumLR += board[i][i];
    sumRL += board[i][2 - i];
  }

  if (sumLR === 3) {
    winner = "X";
  }
  if (sumLR === -3) {
    winner = "O";
  }

  if (sumRL === 3) {
    winner = "X";
  }
  if (sumRL === -3) {
    winner = "O";
  }
  console.log(winner);
  if (winner !== "") {
    info.innerHTML = `${winner} wins!`;
    return true;
  } else {
    return false;
  }
}
