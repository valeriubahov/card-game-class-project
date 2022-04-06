// TODO: add functionality to link to the game display once the submit button is clicked.
import { Link } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { UserContext, UserProvider } from "../../context/UserContext";
import './login.css';

const LoginWindow = function (props) {
    const [user, setUser] = useContext(UserContext);

    const createUser = () => {
        const loginName = document.getElementById("newUserName").value;
        let userName = "";
        let _id = "";
        let profilePic = "";
        fetch("http://localhost:5000/users")
            .then(response => response.json())
            .then(value => {
                const userArr = value.filter(x => x.userName === loginName);
                if (userArr.length > 0) {
                    userName = userArr[0].userName;
                    _id = userArr[0]._id
                    profilePic = userArr[0].profilePic
                }

                if (userName !== undefined && userName !== '') {
                    document.getElementById("message").innerHTML = 'User already exists';
                }
                else 
                {
                    const imgInput = document.getElementById("userIcon")

                    const imageData = new FormData()
                    //below line for uploading the actual picture into the uploads folder
                    imageData.append("profile_pic", imgInput.files[0]);
                    // alert(imgInput.files[0].name)
                    //below line to have the file name as an object.
                    // imageData.append("pic_name", imgInput.filename);


                    fetch("http://localhost:5000/uploads", {
                        method: "POST",
                        body: imageData
                    })

                    const newUserName = document.getElementById("newUserCreation")
                    const nameData = new FormData(newUserName)
                    nameData.append("profile_pic", imgInput.files[0].name);

                    //TODO: change the below line to grab the file path of the imageu upload and put that into mongoDB first.
                    //reseach after about a way to upload the image first, and then deposit the image inthe the DB.
                    // nameData.append("profile_pic", imgInput.files[0])

                    fetch("http://localhost:5000/users/add", {
                        method: "POST",
                        body: nameData
                    })
                    document.getElementById("message").innerHTML = 'User Created';

                }
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
                const userArr = value.filter(x => x.userName === loginName).length;
                if (userArr.length > 0) {
                    userName = userArr[0].userName
                    _id = userArr[0]._id
                    profilePic = userArr[0].profilePic

                    let loginInfo = {
                        'userName': userName,
                        '_id': _id,
                        'profilePic': profilePic
                    }
                    setUser(loginInfo);
                }
            })
    }


    return (
        <div className="loginContainer">
            <div className="login">
                <div className="form">
                    <form id="newUserCreation" className="login-form" onSubmit={createUser}>
                        <span >Sign Up</span>
                        <input type="text" id="newUserName" name="person_name" placeholder="Enter your username" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                        <input type="file" name="profile_pic" id="userIcon" accept=".tiff,.jpg,.jpeg,.png,.bmp"/>
                        <button type="button" value="Create New User" onClick={createUser}>Create New User</button>
                        <p id='message'></p>
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