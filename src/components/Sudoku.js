import '../styles/Sudoku.css';
import '../styles/Responsive.css';
import { generateSolution, generatePuzzle, validatePuzzle } from '../methods/index';
import React, { useEffect, useState, useRef } from 'react';
import Grid from './Grid.js';
import Header from './Header.js';
import Controls from './Controls.js';

function Sudoku() {
    const [solution, setSolution] = useState([]);
    const [puzzle, setPuzzle] = useState([]);
    const [solutionData, setSolutionData] = useState({});
    const [emptyBoxes, setEmptyBoxes] = useState(0);
    const [time, setTimer] = useState(0);
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
        clearGame(newGame, refreshBoard(newPuzzle['board']));
        clearInterval(timer.current);
        setTimer(0); 
        startTimer();
    }
    
    const startTimer = () => {
        timer.current = setInterval(() => {
            setTimer(time => time+1);
        }, 1000);
    }

    const clearGame = (newGame, newBoard = {}) => {
        for (let id in solutionData) {
            const box = document.getElementById(id);
            box.value = null;
        }
        setSolutionData({});
        isAutoCorrect(true, true, newGame, newBoard);
        const msgBox = document.getElementById('message');
        msgBox.innerText = '';
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

    const convertData = (data) => {
        const board = puzzle.map(function(arr) {
            return arr.slice();
        });

        for (let key in solutionData) {
            const idxs = key.split('-');
            const row = idxs[0];
            const col = idxs[1];
            board[row][col] = solutionData[key];
        }
        return board;
    }

    const handleOnChange = (e) => {
        let value = e.target.value;
        const id = e.target.id;
        let input = document.getElementById(id);
        if (!value || value > 9 || value < 1 || !Number.isInteger(Number(value))) {
            input.value = null;
            delete solutionData[id];
        } else {
            input.value = value;
            solutionData[id] = Number(value);
        }
        setSolutionData(solutionData);
        isPuzzleComplete(Object.keys(solutionData), emptyBoxes);
        const isChecked = document.getElementById('auto-correct-check').checked;
        isAutoCorrect(isChecked);
    }

    const isPuzzleComplete = (solution, emptyBoxes) => {
        if (Object.keys(solution).length !== emptyBoxes) return;
        const validSolution = validatePuzzle(convertData());
        const msgBox = document.getElementById('message');
        if (validSolution) {
            msgBox.innerText = 'congrats';
        } else {
            msgBox.innerText = 'fail';
        }
    }
    
    const isAutoCorrect = (autoCorrect, clear = false, newGame = false, newBoard = {}) => {
        const solutions = newGame ? newBoard : solutionData;
        for (let key in solutions) {
            const idxs = key.split('-');
            const row = idxs[0];
            const col = idxs[1];
            const element = document.getElementById(key);
            if ((!clear && autoCorrect) && solution[row][col] !== solutionData[key]) {
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

    return (
        <div>
            <Header/>
            <Controls 
                selectDifficulty={selectDifficulty}
                time={time}
                handleAutoCorrect={handleAutoCorect}
            />
            <Grid puzzle={puzzle} handleOnChange={handleOnChange} />
            <div>
                <button onClick={() => createGame('easy', true)}>New Game</button>
                <button onClick={() => clearGame(false)}>Clear</button>
            </div>
            <div id='message'>

            </div>
        </div>
    );
}

export default Sudoku;
