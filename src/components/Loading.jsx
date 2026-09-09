import React from 'react'
import load from '../animation/load.gif'
const Loading = (props) => {
    if (!props.isloading) {
        return null;
    }
    
    return (
        <div className="loadingScreen">
            <div id="animation-container">
                <img src = {load}/>
            </div>
        </div>
    )
}

export default Loading