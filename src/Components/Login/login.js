// TODO: add functionality to link to the game display once the submit button is clicked.
import { Link } from "react-router-dom";

const LoginWindow = (props) => {

    const uploadImage = () => {
        alert("uploading");
        //add a post using a fetch 
        //grab the file that's in the form 
        //use "https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api" as a starting point.
    }








    return (
        <div>
            <h1>Honey Badger Games!</h1>
            <p>New Player:</p>
                <form id="newUserCreation" onSubmit={uploadImage}>
                    <label htmlFor="newUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="newUserName" name="newUserName"></input><br></br>
                    <span>Upload your Profile Picture: </span> <input type="file" id="userIcon"></input><br></br>
                    <input type="submit" value="Create New User"></input>
                </form>
            <br></br>
            <p>Already a Player:</p>
                <form id="loginForm">
                    <label htmlFor="existingUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="existingUserName" name="existingUserName"></input><br></br>
                    <Link to ="/game-display"><button type="button" value="Login">Login</button></Link>
                </form>

        </div>

    )
}

export default LoginWindow;

//for image saving make a folder when react will save them, and then mongoDB can pull and store them in there.