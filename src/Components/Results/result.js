import './result.css';
// TODO: Submit MongoDB data into table
// TODO: Style Tables to make it look less messy


function Result () {
    return(
        <div className="result-name">
            <h3 id="results">Results</h3> 
            <table border ="1">
                <tr>
                    <td>Highest User Score</td>
                    <td id="user-score-highest">(insert score data)</td>
                    <br/>
                </tr>

            </table>
            <table border="1">
                <tr>
                
                    <td>Userscore</td>
                    <td id="user-score-2nd">(insert score data)</td>
                    
                </tr>
                </table>
            <table border="1">
                <tr>   
                <br/>
                    <td >Userscore</td>
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