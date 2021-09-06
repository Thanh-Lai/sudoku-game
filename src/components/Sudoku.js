import '../styles/Sudoku.css';
import '../styles/Responsive.css';
import { generateSolution, generatePuzzle, validatePuzzle } from '../methods/index';
import React, { useEffect, useState, useRef } from 'react';
import Grid from './Grid.js';
import Header from './Header.js';
import Controls from './Controls.js';
import Popup from './Popup.js';

function Sudoku() {
    const [solution, setSolution] = useState([]);
    const [puzzle, setPuzzle] = useState([]);
    const [solutionData, setSolutionData] = useState({});
    const [emptyBoxes, setEmptyBoxes] = useState(0);
    const [blankBoxes, setBlankBoxes] = useState({});
    const [time, setTimer] = useState(0);
    const [notesStatus, setNotesStatus] = useState(false);
    const [pause, setPause] = useState(false);
    const [hints, setHints] = useState({});
    const [gameWon, setGameStatus] = useState(null);
    const timer = useRef(null);
 
    useEffect(() => {
        createGame();
    },[]);

    const createGame = (difficulty='easy', newGame=false) => {
        document.getElementById('auto-correct-check').checked = false;
        const board = () => {
            let result = [];
            for(let i = 0; i < 9; i++) {
                result.push(new Array(9).fill(0));
            }
            return result;
        }
        const newBoard = board();
        const solution = generateSolution(newBoard);
        const newPuzzle = generatePuzzle(solution, difficulty);
        const difficultyLvl = document.getElementById('difficulty-lvl');
        difficultyLvl.value = difficulty;
        setSolution(solution);
        setPuzzle(newPuzzle['board']);
        setEmptyBoxes(newPuzzle['emptyBoxes']);
        setBlankBoxes(newPuzzle['blankBoxes']);
        handleNotesToggle(true);
        clearGame(newGame, newPuzzle['blankBoxes'], refreshBoard(newPuzzle['board']));
        clearInterval(timer.current);
        setTimer(0); 
        setPause(false);
        setHints({})
        setGameStatus(null);
        startTimer();
    }
    
    const startTimer = () => {
        timer.current = setInterval(() => {
            setTimer(time => time+1);
        }, 1000);
    }

    const clearGame = (newGame, blankBoxes={}, newBoard = {}) => {
        for (let id in solutionData) {
            const box = document.getElementById(id);
            box.value = null;
            disableNotes(box,id, true);
        }
        setSolutionData({});
        setBlankBoxes(blankBoxes);
        isAutoCorrect(true, true, newGame, newBoard);
    }

    const refreshBoard = (newPuzzle) => {
        const obj = {};

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const curr = newPuzzle[i][j];
                const id = `${i}-${j}`;
                if (curr === '-') {
                    obj[id] = 'blank';
                } else {
                    obj[id] = 'given';
                }
            }
        }
        return obj;
    }

    const convertData = () => {
        const board = puzzle.map(function(arr) {
            return arr.slice();
        });

        for (let key in solutionData) {
            const idxs = key.split('-');
            const row = idxs[0];
            const col = idxs[1];
            board[row][col] = solutionData[key]['value'];
        }
        return board;
    }

    const handleOnChange = (e) => {
        let value = e.target.value;
        const id = e.target.id;
        const key = id.split('-');
        const i = Number(key[0]);
        const j = Number(key[1]);

        if (!solutionData[id]) {
            solutionData[id] = {};
        }
        let input = document.getElementById(id);
        if (!solutionData[id]['mode']) {
            solutionData[id]['mode'] = 'normal';
            setSolutionData(solutionData);
        }
        toggleNotesDisplay(input, id, value);
        if (solutionData[id]['mode'] === 'notes') return;
        if (!value || value > 9 || value < 1 || !Number.isInteger(Number(value))) {
            input.value = null;
            delete solutionData[id];
            blankBoxes[id] = [i,j];
        } else {
            input.value = value;
            if (!notesStatus) {
                solutionData[id]['value'] = Number(value);
                solutionData[id]['mode'] = 'normal';
                if (solution[i][j] === Number(value)) {
                    delete blankBoxes[id];
                } else {
                    blankBoxes[id] = [i,j];
                }
            }
        }
        setBlankBoxes(blankBoxes);
        setSolutionData(solutionData);
        isPuzzleComplete();
        const isChecked = document.getElementById('auto-correct-check').checked;
        isAutoCorrect(isChecked);
    }

    const toggleNotesDisplay = (input, id, value) => {
        solutionData[id] = {};
        const key = id.split('-');
        const i = Number(key[0]);
        const j = Number(key[1]);
        if (notesStatus) {
            enableNotes(input, id, value);
            input.value = null;
            solutionData[id]['mode'] = 'notes';
            blankBoxes[id] = [i,j];
        } else {
            disableNotes(input, id);
            solutionData[id]['value'] = Number(value);
            solutionData[id]['mode'] = 'normal';
        }
        setBlankBoxes(blankBoxes);
        setSolutionData(solutionData);
    }

    const disableNotes = (input, id, clear = false) => {
        const notesGrid = document.getElementById(id+'_Grid');
        if (clear) {
            const notesGridNums = Array.from(notesGrid.children);
            notesGridNums.forEach(num => {
                const numClassList = num.classList;
                if (numClassList.contains('show-num')) {
                    num.classList.add('hide-num');
                    num.classList.remove('show-num');
                }
            })
        }
        input.classList.add('solution-inputs');
        input.classList.remove('mini-grid-inputs');
        input.parentNode.style.display = 'flex';
        notesGrid.style.display = 'none';
    }
    const enableNotes = (input, id, value) => {
        if (!Number.isInteger(Number(value)) || value > 9 || value < 1) return;

        const num = document.getElementById(id+'_Grid'+value).classList;
        if (num.contains('hide-num')) {
            num.remove('hide-num');
            num.add('show-num');
            input.parentNode.style.backgroundColor = 'white';
            input.style.backgroundColor = 'white';
        } else {
            num.add('hide-num');
            num.remove('show-num');
        }
        input.classList.remove('solution-inputs');
        input.classList.add('mini-grid-inputs');
        input.parentNode.style.display = 'block';
        document.getElementById(id+'_Grid').style.display = 'grid';
    }

    const isPuzzleComplete = () => {
        if (Object.keys(solutionData).length !== emptyBoxes) return;
        const validSolution = validatePuzzle(convertData()); 
        clearInterval(timer.current);
        if (validSolution) {
            setGameStatus(true);
        } else {
            setGameStatus(false);
        }
    }
    
    const isAutoCorrect = (autoCorrect, clear = false, newGame = false, newBoard = {}) => {
        const solutions = newGame ? newBoard : solutionData;
        for (let key in solutions) {
            const idxs = key.split('-');
            const row = idxs[0];
            const col = idxs[1];
            const element = document.getElementById(key);
            if (
                (!clear && autoCorrect && solutionData[key]['mode'] === 'normal')
                && (solution[row][col] !== solutionData[key]['value'])
                ) {
                element.parentNode.style.backgroundColor = 'red';
                element.style.backgroundColor = 'red';
            } else {
                const color = (newGame && solutions[key] === 'given') ? 'lightcyan' : 'white';
                element.parentNode.style.backgroundColor = color;
                element.style.backgroundColor = color;
            }
        }
    }

    const selectDifficulty = () => {
        const difficultyLvl = document.getElementById('difficulty-lvl').value;
        createGame(difficultyLvl, true);
    }

    const handleAutoCorect = (e) => {
        isAutoCorrect(e.target.checked);
    }

    const handleNotesToggle = (newGame = false) => {
        let currStatus = notesStatus;
        if (newGame) {
            currStatus = false;
            setNotesStatus(currStatus);
        } else {
            currStatus = !currStatus;
            setNotesStatus(currStatus);
        }
        const note = document.getElementById('pencil');
        if (currStatus) {
            note.style.backgroundColor = '#2196F3';
        } else {
            note.style.backgroundColor = 'grey';
        }
    }

    const handlePause = function() {
        const currStatus = !pause;
        setPause(currStatus);
        if (currStatus) {
            clearInterval(timer.current);
        } else {
            startTimer();
        }
    }

    const countCorrect = function() {
        let count = 0;
        for (let key in solutionData) {
            const idxs = key.split('-');
            const row = idxs[0];
            const col = idxs[1];
            if (solution[row][col] === solutionData[key]['value']) {
                count += 1;
            }
        }
        return count;
    }

    const handleHint = function() {
        let currBlanks = Object.values(blankBoxes);
        let currBoxes = emptyBoxes - countCorrect();

        if (currBoxes === 1) return;
        let blank = currBlanks.splice(Math.floor(Math.random() * currBlanks.length),1)[0];
        if (!blank) return;
        let i = blank[0];
        let j = blank[1];
        let key = i+'-'+j;

        hints[key] = puzzle[i][j] = solution[i][j];
        delete solutionData[key];
        delete blankBoxes[key];
        currBoxes -= 1;
        setHints(hints);
        setPuzzle(puzzle);
        setEmptyBoxes(emptyBoxes-1);
        setBlankBoxes(currBlanks);
        setSolutionData(solutionData);
    }

    const pausePlay = pause ? 'Play' : 'Pause';
    const disableBtns = gameWon !== null ? true : false;
    return (
        <div>
            <Header/>
            <Controls 
                selectDifficulty={selectDifficulty}
                time={time}
                handleAutoCorrect={handleAutoCorect}
                handleNotes={handleNotesToggle}
            />
            <Grid
                puzzle={puzzle}
                pause={pause}
                handleOnChange={handleOnChange}
                hints={hints}
                gameWon={gameWon}
            />
            <div>
                <button className='buttons' disabled= {disableBtns} onClick={() => createGame('easy', true)}>New Game</button>
                <button className='buttons' disabled= {disableBtns} onClick={() => clearGame(false, blankBoxes)}>Clear</button>
                <button className='buttons' disabled= {disableBtns} onClick={handlePause}>{pausePlay}</button>
                <button className='buttons' disabled= {disableBtns} onClick={handleHint}>Hint</button>
            </div>
            <Popup newGame={createGame} gameWon={gameWon} time={time}/>
        </div>
    );
}

export default Sudoku;
