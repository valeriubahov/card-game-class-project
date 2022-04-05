import './search.css';
import React, { useState } from "react"; 

/**
 * Search component, used to find & display top 5 scores by user 
 * @param none 
 * @returns Search component
 */
export default function Search() {
  const [display, setDisplay] = useState({ 
    msg: '',
    title: '',
    table: false,
  });

   /**
   * Function to search database for queried username, updates state & display score info on the screen
   * @param click  
   * @returns none
   */
  async function clicked(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/userscore/`);
    if (!response.ok){
      window.alert(`An error occured: ${response.statusText}`);
      return;
    }
    
    const query = e.target.searchUser.value;
    const data = await response.json();
    let user = data.find(x => x.userName === query);

    // clear rows off table if already drawn 
    let table = document.querySelector('#search-score-table');
    if(table) {
      for(let i=table.rows.length-1; i>0; i--){
        table.deleteRow(i);
      }
    }

    if(query !== undefined) {
      if(user !== undefined) {
        if(user.score.length > 0) {
          // set display text and reveal table
          setDisplay({
            msg: '', 
            title: `${user.userName.toUpperCase()}'s TOP 5`,
            table: true,
          });

          // returns 5 best user scores in order
          let sort = user.score.map(x => {
            return [parseInt(x.score), x.date.slice(0, 10)]
          });
          let sorted = sort.sort((a,b) => (b[0] - a[0])).slice(0,5);

          // fill table 
          for(let i=0; i<sorted.length; i++) {
            let row = document.createElement('tr');
            let cellData = [
              document.createTextNode(i + 1), // rank
              document.createTextNode(sorted[i][0]), // score
              document.createTextNode(sorted[i][1]), // date
            ]
            for(let j=0; j<3; j++) {
              let cell = document.createElement('td');
              cell.appendChild(cellData[j]);
              row.appendChild(cell);
            }
            document.querySelector('#search-score-table').appendChild(row);
          }
        } else { setDisplay({ msg: 'No score data found!' }) }
      } else { setDisplay({ msg: 'User not found!' }) }
    }
  }

  return (
    <div id="container">
      <div id="monitor">
        <div id="monitor-screen">
          <div id="text-wrapper">
            <h1>SEARCH HIGH SCORES</h1>
            <form id="search-form" onSubmit={clicked}>
              <input 
              id="search-input"
                type="text"
                name="searchUser"
                placeholder="SEARCH USERS"
              />
              <button id="search-button">
                <i className="fa-solid fa-forward-fast"></i>          
              </button>
            </form>
            <p id="msg">{display.msg}</p>
          </div>
          <div id="table-wrapper">
            <h2 id="title">{display.title}</h2>
            { !display.table ? ('') : (
              <table id="search-score-table">
                <tbody>
                  <tr>
                    <th>RANK</th>
                    <th>SCORE</th>
                    <th>DATE</th>
                  </tr>
                </tbody>
              </table>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}