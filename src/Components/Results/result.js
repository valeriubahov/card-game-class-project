import './result.css';


import React, { useEffect, useState } from 'react';
import './result.css';
import image from './Images/card.png';
import image1 from './Images/cardload.gif';
import frog from './Images/frog.gif';
import frogchill from './Images/chill-frog.gif';
import frogSpecial  from './Images/dance.gif';



// TODO: Figure out key code and impliment an event that returns a arcade cabinent




/**
 * Main Function that contains pulling user data, score and assigning to the application
 
 */
function Result(props) {

    const [records, setRecords] = useState([]);
    let test;


    useEffect(() => {
        
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
                        return Math.max(a,b)
                    },
                    0)

            })).sort((a,b) => {
                return (parseInt(b.score) - parseInt(a.score))
            })


    
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
    let frogCount1 = 0;
    let frogCount2 = 0;
    let frogCount3 = 0;

    // we weant to create 3 different functions for each frog
    // incremient the main frog counter
    // for this method, i use a counter logic to incremient on each click
    // to save time, i could simply just make eacg frog a boolean and set it as a flag on click than check for all to be clicked

    // TODO: Write documentation on the heck you did lol



    function froggie1()
    {
        frogCount1++
        
        if (frogCount1 == 1)
        {
            frogCount++
            alert(`${frogCount} out of 3 Frogs Found`)
            // froggie();
        }
        
        if (frogCount1 > 2)
        {
            frogCount1 = 1;
           
        }

        if (frogCount == 3){
            froggie();
        }
    }

    
    function froggie2()
    {
        frogCount2++
        if (frogCount2 == 1)
        {
            frogCount++
            alert(`${frogCount} out of 3 Frogs Found`)
            // froggie();
        }

    
       if (frogCount == 3 )
       {
           froggie();
       }
    }

    function froggie() {
        frogCount3++
        if (frogCount3 == 1){
            frogCount++
            alert(`${frogCount} out of 3 Frogs`)
        }

       


        if(frogCount == 3){
            alert(`You have discovered ${frogCount} out of 3 Frogs \n `)
            
            let p = document.createElement("p")
            p.innerText = 'You have been visted by the 🐸 of Wisdom \n  '
            document.getElementById("results").appendChild(p)
            let elem = document.createElement("img");
            elem.src = frogchill;
            document.getElementById("results").appendChild(elem);
            
        
        }

    }


    function frog_1() {
        if(frogCount < 2){
            alert('Wait a minute.. your are not supposed to see this...')
        }
        if (frogCount == 3)
        {
            alert('Nice! Found Another Secret.')
            let p1 = document.createElement("p")
            p1.innerText = 'Congrats! You have found another hidden secret. \n'
            document.getElementById("results").appendChild(p1)
            let elm1 = document.createElement("img")
            elm1.src = frogSpecial;
            document.getElementById("results").appendChild(elm1)

        }
    }
    
    return (
        <div className="result-name">
            <img id="gif-top" onClick={froggie} src={frog} />
            <img id="gif-top-1" onClick={froggie1} src={frog} />
            <img id="gif-top-2" onClick={froggie2} src={frog} />
            <img id="result-main" onClick={frog_1} src={image} />


            <h2 id="results">Results 📈</h2>

            <table id="table-display">
                <thead>
                    <tr>
                        <th>Username 👨👩</th>
                        <th> Highest Score ✔️</th>

                    </tr>
                </thead>
                <tbody>
                    {

                        records.map(x => ({
                            id: x._id, user: x.user, score: x.score, date: x.date, 
                        })).map(user =>
                            <tr key={user.id}
                            
                            
                            >
                            
                                <td id='username-display'>🏅{user.user}</td>
                                <td id='userscore-display'>{user.score}</td>

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

