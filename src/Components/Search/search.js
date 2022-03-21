/*
TODO: 
clean up names of state variables... 
add good comments 
make output topscores into a table or something 

BROKEN: on matt bc he has less than 5 scores.. fix!! 

test...
  user found
    more than 5 scores (mykyta 6 scores)
    less than 5 scores (matt)
    0 scores (val) => add no data available msg 
  user not found 
    found user loaded
    nothing loaded
*/
import React, { useState } from "react"; 

export default function Search() {
    const [display, setDisplay] = useState({ 
      msg: '',
      title: '',
      highscores: '',
    });

  async function clicked(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/userscore/`);
    if (!response.ok){
      window.alert(`An error occured: ${response.statusText}`);
      return;
    }
    
    const data = await response.json();
    const query = e.target.searchUser.value;
    let user = data.find(x => x.userName === query);

    // queried user not found 
    if(query !== undefined && user == undefined) { 
      setDisplay({ 
        msg: 'User not found.', 
        title: '',
        highscores: '',
      });
    } 

    if (user !== undefined) { // queried user found 
      if(user.score.length > 0) { // if user has scores saved in db 
        let sortedScore = user.score.reduce((sorted, x) => {
          let i = 0;
          let score = parseInt(x.score.$numberDecimal);
          let date = x.date.slice(0, 10);
          while(i < sorted.length && score < sorted[i][0]) i++;
          sorted.splice(i, 0, [score, date]);
          return sorted;
        }, []);
              
        let test = ''//rename if using
        for(let i=0; i<5; i++) {// dont go up to 5 if you dont need to 
          test += `${i + 1}. ${sortedScore[i][0]} on ${sortedScore[i][1]}\n`
        }// return as a big string but its discarding lne breaks 

        setDisplay({ 
          msg: '', 
          title: `${user.userName}'s Top Scores`,
          highscores: `${test}`,
        });

      } else { setDisplay({ msg: 'No score data found.' }) }
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
      {/* make the scores output less ugly */}
      <p>{display.highscores}</p>
    </div>
  )
}