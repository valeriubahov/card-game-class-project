import './result.css';
// TODO: Submit MongoDB data into table
// TODO: Style Tables to make it look less messy
import React, {useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import './result.css';

function Result (props)  {
    <p>{props.record.name}</p> // TODO: Bring over USER from DB to display 
    return(
        <div className="result-name">
            <h3 id="results">Results</h3> 
            <br/>
            <br/>
            <table border ="1">
                
                <tr>
                    
                    <td>Highest Username</td>
                    <td id="user-score-highest">(insert score data)</td>
                    <br/>
                </tr>

            </table>
            <table border="1">
                <tr>
                
                    <td>Username</td>
                    <td id="user-score-2nd">(insert score data)</td>
                    
                </tr>
                </table>
            <table border="1">
                <tr>   
                <br/>
                    <td >Username</td>
                    <td id ="user-score-3rd">(insert score data)</td>  
                </tr>   
                </table> 
            <br/>
            <br/>
            <br/>
            <button id="quit">Quit</button>
            
            </div>
    )
}

export default Result;
