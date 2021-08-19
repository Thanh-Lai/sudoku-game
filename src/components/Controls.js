import React from 'react';

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
            <div lassName="control-class" style={{width: '100px'}}>
                <strong>Time:&nbsp;&nbsp;</strong>
                {timeGetter()}
            </div>
        </div>
    )
}

export default Controls;
