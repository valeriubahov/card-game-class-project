// User not found (Dean) WORKS
// User found, no scores in db (Grace) WORKS 
// User found, more than 5 scores in db, displays only 5 on screen (Mykyta) WORKS
// User found, fewer than 5 scores in db, doesnt display any empty rows (Matt, Valeriu) WORKS

import React, { useState } from "react"; 

export default function Search() {
  const [display, setDisplay] = useState({ 
    msg: '',
    title: '',
    table: false,
  });

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
            title: `${user.userName}'s Top Scores`,
            table: true,
          });
          // returns 5 best user scores in order
          let sort = user.score.map(x => {
            return [parseInt(x.score.$numberDecimal), x.date.slice(0, 10)]
          });
          let sorted = sort.sort((a,b) => (b[0] - a[0])).slice(0,5);
          // fill table 
          for(let i=0; i<sorted.length; i++) {
            let row = document.createElement('tr');
            let cellData = [
              document.createTextNode(`${i + 1}.`), // rank
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
        } else { setDisplay({ msg: 'No score data found.' }) }
      } else { setDisplay({ msg: 'User not found.' }) }
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
        <button>Go</button>
      </form>
      <p>{display.msg}</p>
      <h2>{display.title}</h2>
      <div id="table-wrapper">
        { !display.table ? ('') : (
          <table 
            id="search-score-table"      
            style={{ borderCollapse: 'collapse' }}
          >
            <tbody>
              <tr>
                <th></th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </tbody>
          </table>
          )
        }
      </div>
    </div>
  )
}