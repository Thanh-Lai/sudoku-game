import React from 'react';
import '../styles/Controls.css';

function Controls({ selectDifficulty, time, handleAutoCorrect,handleNotes }) {
    let date = new Date(time * 1000);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getSeconds();
    
    const timeGetter = () => {
        hours = hours < 10 ? '0'+ hours: hours;
        minutes = minutes < 10 ? '0'+ minutes: minutes;
        seconds = seconds < 10 ? '0'+ seconds: seconds;
        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div id="controls">
            <div id="controls-left">
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
            </div>
            <div id="controls-right">
                <div id="auto-correct" className="control-class">
                    <strong>Auto-Correct:</strong>
                    <label className="switch" >
                        <input id="auto-correct-check" onChange={handleAutoCorrect} type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div id="notes" className="control-class">
                    <strong>Notes: </strong>
                    <button id="pencil" onClick={() => handleNotes(false)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Controls;
