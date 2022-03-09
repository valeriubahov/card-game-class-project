// TODO: add functionality to link to the game display once the submit button is clicked.
import {Link} from "react-router-dom";

const LoginWindow = function(props)
{

    return(
        <div>
            <h1>Honey Badger Games!</h1>
            <p>New Player:</p>
                <form id="newUserCreation">
                    <label for="newUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="newUserName" name="newUserName"></input><br></br>
                    <span>Upload your Profile Picture: </span> <input type="button" id="userIcon" value="Select your Image"></input><br></br>
                    <input type="submit" value="Create New User"></input>
                </form>
            <br></br>
            <p>Already a Player:</p>
                <form id="loginForm">
                    <label for="existingUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="existingUserName" name="existingUserName"></input><br></br>
                </form>

        </div>
 
    ) 
}

export default LoginWindow;

//for image saving make a folder when react will save them, and then mongoDB can pull and store them in there.