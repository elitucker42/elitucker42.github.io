let data;
let board;

// Load and parse the CSV file
async function loadCSV() {
    const response = await fetch('data.csv');
    const csvText = await response.text();
    data = Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            populateDateSelector(results.data);
        }
    });
}

// Populate the date selector dropdown
function populateDateSelector(rows) {
    const dateSelector = document.getElementById('date-selector');
    const dates = [...new Set(rows.map(row => row.date))];  // Get unique dates
    dates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateSelector.appendChild(option);
    });
}

// Handle date selection
function handleDateChange(event) {
    const selectedDate = event.target.value;
    const wordsForDate = data.data.filter(row => row.date === selectedDate);
    populateBoard(wordsForDate);
    document.getElementById('game-board').style.display = 'block';  // Show the game board
}

// Shuffle array utility function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
}

// Populate the game board with words and colors
function populateBoard(wordsForDate) {
    const gameBoard = document.getElementById('game-board');
    shuffle(wordsForDate);  // Randomize word order
    wordsForDate.forEach((wordObj, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.backgroundColor = wordObj.color;
        cell.textContent = wordObj.word;
        gameBoard.appendChild(cell);
    });
}

// Initial call to load CSV and populate date selector
loadCSV();