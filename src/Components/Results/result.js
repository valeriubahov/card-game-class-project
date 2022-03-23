import './result.css';


// TODO 

// Pull real time score to result screen
// Fix Quit Button 
// Pull UserScore and Display
// Import script from search 

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './result.css';

function Result(props) {

    const [records, setRecords] = useState([]);
    let test;

    
    useEffect(() => {
        fetchDatas();
        fetchScore();

        // Pulls user score data 
        async function fetchScore (e){
            
            const response = await fetch(`http://localhost:5000/userscore/`);
            if (!response.ok){
              window.alert(`An error occured: ${response.statusText}`);
              return;
            }
            const data = await response.json();
            const query = e.target.searchUser.value;
             let user = data.find(x => x.userName === query);
             console.log(data)
        }

        // Pulls UserID
        async function fetchDatas() {
            await fetch('http://localhost:5000/users').then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.map(x => x))
                    setRecords(data)
                })
        }
        
    }, []);
    return (
        <div className="result-name">
            <h2 id="results">Results</h2>

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map(x => ({ id: x._id, user: x.userName, score: 100 })).map(user =>
                            <tr key={user.id}>
                                <td>{user.user}</td>
                                <td>{user.score}</td>
                            </tr>

                        )
                    }
                </tbody>
            </table>

            <button  id="quit">Quit</button>

        </div>
    )
}

export default Result;

