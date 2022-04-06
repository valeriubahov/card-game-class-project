// TODO: add functionality to link to the game display once the submit button is clicked.
import { Link } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { UserContext, UserProvider } from "../../context/UserContext";
import './login.css';

const LoginWindow = function (props) {
    const [user, setUser] = useContext(UserContext);

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

    const loginUser = async () => {
        //need to confirm the username entered into the text field is in the mongoDB, if it is return the user info as a prop/object to be passed along.
        const loginName = document.getElementById("existingUserName").value
        //else error message saying that user doesn't exist.
        // console.log("login name", loginName.value);
        let userName = "";
        let _id = "";
        let profilePic = "";
        fetch("http://localhost:5000/users")
            .then(response => response.json())
            .then(value => {
                userName = value.filter(x => x.userName === loginName)[0].userName
                // console.log(userName);
                _id = value.filter(x => x.userName === loginName)[0]._id
                // console.log(_id);
                profilePic = value.filter(x => x.userName === loginName)[0].profilePic



                //impletement below objet as a state object.
                let loginInfo = {
                    'userName': userName,
                    '_id': _id,
                    'profilePic': profilePic
                }
                setUser(loginInfo);
                console.log(`Login ${user} `)
                // const [state, setState] = useState({
                //     userName: userName,
                //     _id: _id,
                //     profilePic: profilePic
                // })

                // const {userName, _id, profilePic} = state

            })

    }


    return (
        <div className="loginContainer">
            <div className="login">
                <div className="form">
                    <form id="newUserCreation" className="login-form" onSubmit={createUser}>
                        <span >Sign Up</span>
                        <input type="text" id="newUserName" name="person_name" placeholder="Enter your username" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                        <input type="file" name="profile_pic" id="userIcon" />
                            {/* <Link to="/game-display" user={user}> */}
                                <button type="button" value="Create New User" onClick={createUser}>Create New User</button>
                                {/* </Link> */}
                    </form>
                </div>
            </div>

            <div className="login">
                <div className="form">
                    <form className="login-form">
                        <span >Login</span>
                        <input type="text" id="existingUserName" name="existingUserName" placeholder="Enter your username" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
                        <UserProvider value={user}>
                            <Link to="/game-display" user={user}><button type="button" value="Login" onClick={loginUser}>Login</button></Link>
                        </UserProvider>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginWindow;

//for image saving make a folder when react will save them, and then mongoDB can pull and store them in there.