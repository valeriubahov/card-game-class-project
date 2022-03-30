// TODO: add functionality to link to the game display once the submit button is clicked.
import {Link} from "react-router-dom";

const LoginWindow = function(props)
{

    // const uploadImage = () => {
    //     alert("uploading");

    //     const imgInput = document.getElementById("userIcon")

    //     const imageData = new FormData()
    //     imageData.append("profile_pic", imgInput.files[0])

    //     fetch("http://localhost:5000/uploads", {
    //         method: "POST",
    //         body: imageData
    //     })

    //     //add a post using a fetch 
    //     //grab the file that's in the form 
    //     //use "https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api" as a starting point.
    // }

    const createUser = () => {
        alert("creating user");

        // function uploadImage(){
            const imgInput = document.getElementById("userIcon")

            const imageData = new FormData()
            //below line for uploading the actual picture into the uploads folder
            imageData.append("profile_pic", imgInput.files[0]);
            //below line to have the file name as an object.
            // imageData.append("pic_name", imgInput.filename);


            fetch("http://localhost:5000/uploads", {
                method: "POST",
                body: imageData
            })
        

        // uploadImage();
        
        const newUserName = document.getElementById("newUserCreation")

        const nameData = new FormData(newUserName)

        //TODO: change the below line to grab the file path of the imageu upload and put that into mongoDB first.
        //reseach after about a way to upload the image first, and then deposit the image inthe the DB.
        // nameData.append("profile_pic", imgInput.files[0])

        fetch("http://localhost:5000/users/add", {
            method: "POST",
            body: nameData
        })
    }

    const loginUser = () => {
        //need to confirm the username entered into the text field is in the mongoDB, if it is return the user info as a prop/object to be passed along.
        const loginName = document.getElementById("existingUserName").value
        // if(loginName)
        //else error message saying that user doesn't exist.
        console.log("login name", loginName.value);

        fetch("http://localhost:5000/users")
        .then(response => response.json())
        .then(value => (value.filter(x => x.userName === loginName)));


    }


    return(
        <div>
            <h1>Honey Badger Games!</h1>
            <p>New Player:</p>
                <form id="newUserCreation" onSubmit={createUser}>
                    <label htmlFor="newUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="newUserName" name="person_name"></input><br></br>
                    <span>Upload your Profile Picture: </span> <input type="file" name="profile_pic" id="userIcon"></input><br></br>
                    {/* change the onClick function to a new one that first does the image upload, and then submits the form data into mongo. */}
                    <Link to ="/game-display"><button type="button" value="Create New User" onClick={createUser} >Create New User</button></Link>
                </form>
            <br></br>
            <p>Already a Player:</p>
                <form id="loginForm">
                    <label htmlFor="existingUserName">Please Enter Your Username:</label><br></br>
                    <input type="text" id="existingUserName" name="existingUserName"></input><br></br>
                    {/* add onClick function that passes the user info prop on to the game display. */}
                    <Link to ="/game-display"><button type="button" value="Login" onClick={loginUser}>Login</button></Link>
                </form>

        </div>
 
    ) 
}

export default LoginWindow;

//for image saving make a folder when react will save them, and then mongoDB can pull and store them in there.