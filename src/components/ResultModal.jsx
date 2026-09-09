import React from 'react'
import Firework from './Firework.jsx'
import "../styles/ResultModal.css"
const ResultModal = (props) => {
    
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal">
            <div className="modal-content" >
                <Firework/>
                <h2 className="helpRender2">You scored {props.marks}/10 correct answers</h2>
                <div className = "modal-buttons">
                    <button onClick={props.reload} className="playAgain">Play again</button>
                    <button onClick={props.onClose} className="playAgain">close</button>
                </div>  
            </div>
        </div>
    )
}

export default ResultModal
