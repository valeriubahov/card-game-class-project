// TODO: add functionality to link to the game display once the submit button is clicked.

const LoginWindow = function(props)
{

    return(
        <div>
            <h1>Honey Badger Games!</h1>
            <p>New Player:</p>
                <form id="newUserCreation">
                    <label for="newUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="newUserName" name="newUserName"></input><br></br>
                    <input type="submit" value="Create New User"></input>
                </form>

            <p>Already a Player:</p>
                <form id="loginForm">
                    <label for="existingUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="existingUserName" name="existingUserName"></input><br></br>
                    <input type="submit" value="Login"></input>
                </form>

        </div>
    )
}

export default LoginWindow;