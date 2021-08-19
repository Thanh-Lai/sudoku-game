import React from 'react';
import '../styles/Controls.css';

function Controls({selectDifficulty, time}) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    const timeGetter = () => {
        hours = hours < 10 ? '0'+ hours: hours;
        minutes = minutes < 10 ? '0'+ minutes: minutes;
        seconds = seconds < 10 ? '0'+ seconds: seconds;
        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div id="controls">
            <div className="control-class" >
                <strong>Difficulty:&nbsp;&nbsp;</strong>
                <select id="difficulty-lvl" onChange={selectDifficulty}>
                    <option id="easy" value="easy">Easy</option>
                    <option id="medium"  value="medium">Mediun</option>
                    <option id="hard"  value="hard">Hard</option>
                </select>
            </div>
            <div id="timer" className="control-class">
                <strong >Time:&nbsp;&nbsp;</strong>
                <p id="time">{timeGetter()}</p>
            </div>
            <div id="auto-correct" className="control-class">
                Auto-Correct:
                <label class="switch" >
                    <input type="checkbox"></input>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    )
}

export default Controls;
