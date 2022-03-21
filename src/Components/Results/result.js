import './result.css';
// TODO: Submit MongoDB data into table
// TODO: Style Tables to make it look less messy
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './result.css';

function Result(props) {

    const [records, setRecords] = useState(null);
    // Fetches the data from DB

    useEffect(() => {
        async function getRecords(){
            const response = await fetch('http://localhost:5000/users');
            if (!response.ok){
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json()
            return records;
        }

        getRecords().then(data => {
            console.log(data)
            setRecords(data);

           let Sortname =  data.map(x=> x.userName)
           console.log(Sortname) 
            

            document.getElementById('username-1st').innerHTML = Sortname;    
            document.getElementById('username-2nd').innerHTML = Sortname;
            document.getElementById('username-3rd').innerHTML = Sortname;
        });
    })




    return (
        <div className="result-name">
            <h2 id="results">Results</h2>
            <br />
            <br />
            <table border="1">

                <tr>

                    <td id ="username-1st">Highest Username</td>
                    <td id="user-score-highest">(insert score data)</td>
                    <br />
                </tr>

            </table>
            <table border="1">
                <tr>

                    <td id="username-2nd">Username</td>
                    <td id="user-score-2nd">(insert score data)</td>

                </tr>
            </table>
            <table border="1">
                <tr>
                    <br />
                    <td id="username-3rd">Username</td>
                    <td id="user-score-3rd">(insert score data)</td>
                </tr>
            </table>
            <br />
            <br />
            <br />
            <button id="quit">Quit</button>

        </div>
    )
}

export default Result;

