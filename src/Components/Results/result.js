import './result.css';


import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './result.css';
import image from './card.png';
import image1 from './cardload.gif';
import frog from './frog.gif';




// TODO:

// Add 1st, 2nd, 3rd place emoji to the Top 3 in Results
// Make the table look better
// Replace rotating frog with another gif to add additional style to the page 


/**
 * Main Function that contains pulling user data, score and assigning to the application
 
 */
function Result(props) {

    const [records, setRecords] = useState([]);
    let test;


    useEffect(() => {
        // fetchDatas();
        fetchScore();

        /**
 * Fetches Userscore into an array, sorts it and returns from Highest to Lowest
 */
        async function fetchScore(e) {

            const response = await fetch(`http://localhost:5000/userscore/`);
            if (!response.ok) {
                window.alert(`An error occured: ${response.statusText}`);
                return;
            }
            const data = await response.json();
            console.log('Userscore Original: ', data)





            const testUser = data.map(x => ({
                id: x._id, user: x.userName, score: x.score.map(x => x.score).reduce(
                    function (a, b) {

                        return Math.max(a, b)



                    },
                    0)

            }))

            console.log('Working', testUser)
            setRecords(testUser)

            const TimeUser = data.map(x => ({
                score: x.score.map(x => x.date).sort(function (c, d) {
                    return Math.max(c, d)
                })
            }))
            console.log('Time', TimeUser)



        }





    }, []);

    /**
  * Sends user back to home screen
  */

    function quitbotton() {
        window.location = '/';
        alert('Thanks for playing!')
    }

    let frogCount = 0;

    function froggie() {
        frogCount++
        if (frogCount === 6) {

            alert('You have been visited by the Frog of Wisdom \n May your odds be in your favor')
            window.location = '/';
        }

    }



    return (
        <div className="result-name">
            <img id="gif-top" onClick={froggie} src={frog} />
            <img id="result-main" src={image} />
            {/* <img src={image1} /> */}

            <h2 id="results">Results 📈</h2>

            <table id="table-display">
                <thead>
                    <tr>
                        <th>Username 👨👩</th>
                        <th> Highest Score ✔️</th>
                        {/* <th>ID 🃏</th>  */}

                    </tr>
                </thead>
                <tbody>
                    {

                        records.map(x => ({
                            id: x._id, user: x.user, score: x.score, date: x.date,
                        })).map(user =>
                            <tr key={user.id}>
                                <td id='username-display'>🏅{user.user}</td>
                                <td id='userscore-display'>{user.score}</td>
                                <td id='username-date'>{user.date}</td>

                            </tr>

                        )
                    }
                </tbody>
            </table>
            <br />
            <button id="quit" onClick={quitbotton} >Quit ↩️</button>

        </div>
    )
}

export default Result;

