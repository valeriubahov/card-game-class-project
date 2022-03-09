// TODO: when submit button is clicked, search database for username and display scores if username is found
 
export default function UserSearch(props) {
    return(
        <div>
            <p>Search for Player:</p>
            <form id="searchUser">
                <label for="searchUserName">Please Enter Username:</label><br/>
                <input type="text" id="searchUserName" name="searchUserName"></input><br/>
                <input type="submit" value="Search"></input>
            </form>
        </div>
    )
}