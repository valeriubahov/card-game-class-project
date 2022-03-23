// TODO: add functionality to link to the game display once the submit button is clicked.
import {Link} from "react-router-dom";

const LoginWindow = function(props)
{

    const uploadImage = () => {
        alert("uploading");

        const imgInput = document.getElementById("userIcon")

        const imageData = new FormData()
        imageData.append("profile_pic", imgInput.files[0])

        fetch("http://localhost:5000/uploads", {
            method: "POST",
            body: imageData
        })

        //add a post using a fetch 
        //grab the file that's in the form 
        //use "https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api" as a starting point.
    }

    const createUser = () => {
        alert("creating user");

        const newUserName = document.getElementById("newUserCreation")
        const imgInput = document.getElementById("userIcon")

        const nameData = new FormData(newUserName)
        nameData.append("person_position", "0")
        nameData.append("person_level", "0")
        nameData.append("profile_pic", imgInput.files[0])

        fetch("http://localhost:5000/users/add", {
            method: "POST",
            body: nameData
        })

//take the image upload function and grab the guts of it and put it here.  
//change the onclick for new user from upload Image to the create user function
//create a blob section in mongo to upload the image from the temp folder into the database.


    }

    return(
        <div>
            <h1>Honey Badger Games!</h1>
            <p>New Player:</p>
                <form id="newUserCreation" onSubmit={uploadImage}>
                    <label htmlFor="newUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="newUserName" name="person_name"></input><br></br>
                    <span>Upload your Profile Picture: </span> <input type="file" name="profile_pic" id="userIcon"></input><br></br>
                    <Link to ="/game-display"><button type="button" value="Create New User" onClick={createUser} >Create New User</button></Link>
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