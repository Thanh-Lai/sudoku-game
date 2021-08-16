var setDifficultyNumber = difficulty => {
    let number = 0;
    switch(difficulty) {
        case 'easy':
        number = Math.floor(Math.random() * (45 - 40) + 40)
        break;
        case 'medium':
        number = Math.floor(Math.random() * (55 - 50) + 40)
        break;
        case 'hard':
        number = Math.floor(Math.random() * (55 - 50) + 40)
        break;
        default:
        number = Math.floor(Math.random() * (45 - 40) + 40)
    }
    return number;
}

export default function generatePuzzle(board, difficulty = 'easy') {
    let holesNumber = setDifficultyNumber(difficulty);
    let newBoard = board.map(function(arr) {
        return arr.slice();
    });
    while(holesNumber > 0) {
        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        // console.log(i, j)
        if (newBoard[i][j] !== '-') {
        newBoard[i][j] = '-';
        holesNumber--;
        }
    }
    return newBoard;
}