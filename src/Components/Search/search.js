import React, { useState } from "react"; 

export default function Search() {
  const [display, setDisplay] = useState({ msg: '', title: '' });

  async function clicked(e) {
    e.preventDefault();
    const query = e.target.searchUser.value;
    
    const response = await fetch(`http://localhost:5000/users/`);
    if (!response.ok){
      window.alert(`An error occured: ${response.statusText}`);
      return;
    }

    const users = await response.json();
    let user = users.find(u => u.userName === query);
    if (user !== undefined) {
      setDisplay({ msg: '', title: `${user.userName}'s Top Scores` });
      console.log('ID = ', user.userId.$numberDecimal); // need this to match against scoreboard collection
    }
    if(user == undefined && query !== undefined) { 
      setDisplay({ msg: 'User not found.', title: '' });
    }
  }
  
  return (
    <div>
      <h1>Search</h1>
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
    </div>
  )
}