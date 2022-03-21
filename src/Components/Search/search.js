import React, { useState } from "react"; 

export default function Search() {

  const [display, setDisplay] = useState({// rename any of these?
    msg: '', // displays under search bar
    title: '', // displays over table
    // table stuff?
  });

  async function clicked(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/users/`);
    if (!response.ok){
      window.alert(`An error occured: ${response.statusText}`);
      return;
    }

    const query = e.target.searchUser.value;
    const users = await response.json();



    let user = users.find(u => u.userName === query);
    if (user !== undefined) {
      setDisplay({ 
        msg: '', 
        title: `${user.userName}'s Top Scores` 
      });

      // i am not actually connected to the db at all here... i am just getting the user collection from the server route
      // so i cant actually join the tables here, i need a scores route from the server 

 



      // console.log('ID = ', user.userId.$numberDecimal);
      
      // display top 5 scores from user ... match against scoreboard table 
      // get data from scoreboard table to print here 






    }


    // node server is crashing after each request to server... fix this 

    if(query !== undefined && user == undefined) { 
      setDisplay({ 
        msg: 'User not found.', 
        title: '',
      });
    } 
  }

  return (
    <div>

      <h1>Search User Scores</h1>

      <form onSubmit={clicked}>

        <input 
          type="text"
          name="searchUser"
          placeholder="Enter Username"
        />
        <button type="submit">Go</button>

      </form>

      <p>{display.msg}</p>

      <h2>{display.title}</h2>

      {/* only display table when user is found */}
      {/* show top 5 scores available, or as many as are available if theres less than that  */}

      {/* <table>
        <tr>
          <th>Score</th>
          <th>Date</th>
        </tr>
        <tr>
          <td>100</td>
          <td>May 1, 2020</td>
        </tr>
      </table> */}

    </div>
  )
}