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

    const createGame = (difficulty='easy') => {
        clearGame();
        document.getElementById('auto-correct-check').checked = false;
        isAutoComplete(false);
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
        clearInterval(timer.current);
        setTimer(0); 
        startTimer();
    }
    
    const startTimer = () => {
        timer.current = setInterval(() => {
            setTimer(time => time+1);
        }, 1000);
    }

    const clearGame = () => {
        for (let id in solutionData) {
            const box = document.getElementById(id);
            box.value = null;
        }
        setSolutionData({});
        isAutoComplete(false, true);
        const msgBox = document.getElementById('message');
        msgBox.innerText = '';
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
        isAutoComplete();
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
    
    const isAutoComplete = (autoCorrect, clear) => {
        const isChecked = document.getElementById('auto-correct-check').checked;
        for (let key in solutionData) {
            const idxs = key.split('-');
            const row = idxs[0];
            const col = idxs[1];
            if (solution[row][col] === solutionData[key]) continue;
            if (!clear && (autoCorrect || isChecked)) {
                document.getElementById(key).parentElement.style.backgroundColor = 'red';
                document.getElementById(key).style.backgroundColor = 'red';
            } else {
                document.getElementById(key).parentElement.style.backgroundColor = 'white';
                document.getElementById(key).style.backgroundColor = 'white';
            }
        }
    }

    const selectDifficulty = () => {
        const difficultyLvl = document.getElementById('difficulty-lvl').value;
        createGame(difficultyLvl);
    }

    const handleAutoCorect = (e) => {
        isAutoComplete(e.target.checked)
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
                <button onClick={() => createGame('easy')}>New Game</button>
                <button onClick={clearGame}>Clear</button>
            </div>
            <div id='message'>

            </div>
        </div>
    );
}

export default Sudoku;
