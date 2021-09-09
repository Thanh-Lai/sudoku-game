import React from 'react';
import '../styles/Popup.css';
import '../styles/Responsive.css';

function Popup({newGame, gameWon, time}) {
    let date = new Date(time * 1000);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getSeconds();
    
    const timeGetter = () => {
        hours = hours < 10 ? '0'+ hours: hours;
        minutes = minutes < 10 ? '0'+ minutes: minutes;
        seconds = seconds < 10 ? '0'+ seconds: seconds;
        let finishTime = '';
        if (hours === '00' && minutes === '00') finishTime = `${seconds} secs`;
        else if (hours === '00') finishTime = `${minutes} mins and ${seconds} secs`;
        else finishTime = `${hours} hours ${minutes} mins and ${seconds} secs`;
        return finishTime;
    }

    let message = gameWon === true ? 'Congratulations! You Won!' : 'Sorry, you lost.';
    if (gameWon === null) message = '';

    return (
        <div id="modal">
            {
                gameWon !== null
                    ?
                    <div className="modal-content">
                        <div>{message}</div>
                        <div><strong>Time: </strong>{timeGetter()}</div>
                        <button className="popup-btn buttons" onClick={() => newGame('easy', true)}>New Game</button>
                    </div> 
                    :
                    null
            }
        </div>
    )
}

export default Popup;
