import React, { useState, useEffect } from "react"; 

function Search() {

  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [display, setDisplay] = useState('');

  useEffect(() => { // i think this is not very efficient rn 
    async function searchUsers() {
      const response = await fetch(`http://localhost:5000/users/`);
      if (!response.ok){
        window.alert(`An error occured: ${response.statusText}`);
        return;
      }
      const users = await response.json();
      let user = users.find(u => u.userName === search)
      
      if (search == '' ||  user !== undefined) {
        setMsg('')
        if(user !== undefined){
          setDisplay(`${user.userName}'s Top Scores`)
          // set up to display the top scores in db on scoreboard table
          console.log('ID=', user.userId.$numberDecimal)
        }
      } else { 
        setMsg('User not found.');
        setDisplay('');
      }
    }
    searchUsers();
  })

  function clicked(e) {
    e.preventDefault();
    setSearch(e.target.searchUser.value);
  }
  
  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={clicked}>
        <input 
          type="text"
          name="searchUser"
          id="userQuery"
          placeholder="Enter Username">
        </input>
      <button type="submit">Go</button>    
      </form>
      <p>{msg}</p>
      <h2>{display}</h2>
    </div>
  )
}

export default Search;