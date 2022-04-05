import './result.css';


import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './result.css';
import image from './card.png';
import image1 from './cardload.gif';
import frog from './frog.gif';
import frogchill from './chill-frog.gif';




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
        if (frogCount === 1) {
            
            alert(`${frogCount} out of 3 Frogs Found`)
            // ;
            
        }
        if (frogCount === 2) {
            alert(`${frogCount} out of 3 Frogs Found`)
        }

        
        // if (frogCount === 3) {
        //     let question = prompt('What is 5x5? ')
        //     if (question == 25){
                
        //     }   
        // }

        if(frogCount === 3){
            alert(`You have discovered ${frogCount} out of 3 Frogs \n `)
            // document.getElementById("root").innerHTML = frogchill;
            let p = document.createElement("p")
            p.innerText = 'You have been visted by the 🐸 of Wisdom \n  '
            document.getElementById("root").appendChild(p)
            let elem = document.createElement("img");
            elem.src = frogchill;
            document.getElementById("root").appendChild(elem);
        
        }

    }



    // Easter Egg == User must find all 3 frogs on screen, when the 3 frogs are all discovered (displays message than reends user to screen)
    // Option 1: seperate functions for each frog << WIP


    return (
        <div className="result-name">
            <img id="gif-top" onClick={froggie} src={frog} />
            <img id="gif-top-1" onClick={froggie} src={frog} />
            <img id="gif-top-2" onClick={froggie} src={frog} />
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
                        })).map((user,index) =>
                            <tr key={index}>
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

