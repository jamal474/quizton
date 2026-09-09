import React from 'react'
import decodeUriComponent from 'decode-uri-component';
import "../styles/question.css"

function Ques(props) 
{
    const inputElement = React.useRef("");
    const [stAns,setStAns] = React.useState(props.initmarks);
    function caller(event)
    {
        selectedOptionClassChange(event.target.className[2]);
        props.updateMarks(event,parseInt(event.target.className[2]));
    }
    
    function selectedOptionClassChange(et) 
    {
        let temp = parseInt(et);
        let arr = [];
        for(let i = 0; i < 4;i++)
        {
            if(i === temp)
            {
                arr[i] = "selected-option";
            }
            else
            {
                arr[i] = `op${i}`;
            }
        }
    
        setStAns(arr);
    }
    
    function decode(text)
    {
        return decodeUriComponent(text)
    }
    return (
        <section className = "questionSection">
            <h1 className = "question">{props.id+1} - {decode(props.question)}</h1>
            <div className = "option">
                <div className = {stAns[0]} onClick = {caller} name = {props.id} value = {decode(props.option[0])}>{decode(props.option[0])}</div>
                <div className = {stAns[1]} onClick = {caller} name = {props.id} value = {decode(props.option[1])}>{decode(props.option[1])}</div>
                <div className = {stAns[2]} onClick = {caller} name = {props.id} value = {decode(props.option[2])}>{decode(props.option[2])}</div>
                <div className = {stAns[3]} onClick = {caller} name = {props.id} value = {decode(props.option[3])}>{decode(props.option[3])}</div>
            </div>
        </section>
        
    )
}

export default Ques;