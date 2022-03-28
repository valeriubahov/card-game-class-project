import './result.css';


import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './result.css';
import image from './card.png';

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
        async function fetchScore (e){
            
            const response = await fetch(`http://localhost:5000/userscore/`);
            if (!response.ok){
              window.alert(`An error occured: ${response.statusText}`);
              return;
            }
            const data = await response.json();
            console.log('Userscore Original: ', data)

            const filter = data.filter(x=> x.score == 100)
            console.log('Filter: ',filter)

            const testUser = data.map(x => ({
                id: x._id, user: x.userName, score: x.score.map(x=> x.score.$numberDecimal).reduce (
                    function (a,b) {
                        return Math.max(a,b)
                    },
                0)
            }))

            setRecords(testUser)  
            console.log('Records: ', records)

            const query = e.target.searchUser.value; // Type Error << Matt fix
            let user = data.find(x => x.userName == query);
             console.log(user)
            
        }

      
        // // Pulls UserID
        // async function fetchDatas() {
        //     await fetch('http://localhost:5000/users').then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //             console.log(data.map(x => x))
        //            setRecords(data)
        //         })
        // }
    

        
    }, []);

   /**
 * Sends user back to home screen
 */

   function quitbotton () 
   {
      window.location = '/'; 
      alert('Thanks for playing!')  
   }

    return (
        <div className="result-name">
            <img src={image} />
            <h2 id="results">Results 📈</h2>

            <table>
                <thead>
                    <tr>
                        <th>Username 👨👩</th>
                        <th> Highest Score ✔️</th>
                        {/* <th>ID 🃏</th>  */}
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        records.map(x => ({ id: x._id, user: x.user, score: x.score
                         })).map(user =>
                            <tr key={user.id}>
                                <td id='username-display'>{user.user}</td>
                                <td id='userscore-display'>{user.score}</td>
                                {/* <td>{user.id}</td> */}
                            </tr>

                        )
                    }
                </tbody>
            </table>
                    <br/>
            <button  id="quit" onClick={quitbotton} >Quit ↩️</button>

        </div>
    )
}

export default Result;

