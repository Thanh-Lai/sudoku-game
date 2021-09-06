var setDifficultyNumber = difficulty => {
    let number = 0;
    switch(difficulty) {
        case 'easy':
            number = Math.floor(Math.random() * (45 - 40) + 40);
            break;
        case 'medium':
            number = Math.floor(Math.random() * (55 - 50) + 50);
            break;
        case 'hard':
            number = Math.floor(Math.random() * (65 - 60) + 60);
            break;
        case 'test':
            number = 1;
            break;
        default:
            number = Math.floor(Math.random() * (45 - 40) + 40);
    }
    return number;
}

export default function generatePuzzle(board, difficulty) {
    let holesNumber = setDifficultyNumber(difficulty);
    const holes = holesNumber;
    const blanks = {};
    const newBoard = board.map(function(arr) {
        return arr.slice();
    });
    while(holesNumber > 0) {
        const i = Math.floor(Math.random() * 9);
        const j = Math.floor(Math.random() * 9);
        if (newBoard[i][j] !== '-') {
            newBoard[i][j] = '-';
            blanks[i+'-'+j] = [i,j];
            holesNumber--;
        }
    }
    return {'board': newBoard, 'emptyBoxes': holes, 'blankBoxes': blanks};
}
