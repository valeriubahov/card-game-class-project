// TODO: add functionality to link to the game display once the submit button is clicked.
import { Link, useNavigate } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { UserContext, UserProvider } from "../../context/UserContext";
import './login.css';

const LoginWindow = function (props) {
    const [user, setUser] = useContext(UserContext);
    let navigate = useNavigate();
    const createUser = () => {
        const loginName = document.getElementById("newUserName").value;
        if (loginName !== '' && loginName !== undefined) {
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
                    else {
                        const newUserName = document.getElementById("newUserCreation")
                        const imgInput = document.getElementById("userIcon")
                    //TODO: look for way of adding in faile type validation
                    //possible solutions: https://www.codexworld.com/file-type-extension-validation-javascript/
                    //https://www.w3docs.com/snippets/html/how-to-allow-the-file-input-type-to-accept-only-image-files.html
                        const imageData = new FormData()
                        //below line for uploading the actual picture into the uploads folder
                        imageData.append("profile_pic", imgInput.files[0]);

                        // fetch("http://localhost:5000/uploads", {
                        //     method: "POST",
                        //     body: imageData
                        // })

                        const nameData = new FormData(newUserName)
                        nameData.append("profile_pic", imgInput.files[0].name);

                        fetch("http://localhost:5000/users/add", {
                            method: "POST",
                            body: nameData
                        })
                        document.getElementById("message").innerHTML = 'User Created';
                    }
                })
        }
        else {
            document.getElementById("message").innerHTML = 'Username is required';

        }
    }

    const loginUser = async () => {
        const loginName = document.getElementById("existingUserName").value;
        let userName = "";
        let _id = "";
        let profilePic = "";
        if (loginName !== '' && loginName !== undefined) {
            fetch("http://localhost:5000/users")
                .then(response => response.json())
                .then(value => {
                    const users = value.filter(x => x.userName === loginName);
                    if (users.length > 0) {
                        userName = users[0].userName;
                        _id = users[0]._id;
                        profilePic = users[0].profilePic;

                        //impletement below objet as a state object.
                        let loginInfo = {
                            'userName': userName,
                            '_id': _id,
                            'profilePic': profilePic
                        }
                        setUser(loginInfo);
                        navigate('/game-display');
                    }
                    else {
                        document.getElementById("loginMsg").innerHTML = 'User not found!';
                    }
                })
        }
        else {
            document.getElementById("loginMsg").innerHTML = 'Please Insert a Username';
        }
    }


    return (
        <div className="loginContainer">
            <div className="login">
                <div className="form">
                    <form id="newUserCreation" className="login-form" onSubmit={createUser}>
                        <span >Sign Up</span>
                        <input type="text" id="newUserName" name="person_name" placeholder="Enter your username" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                        <input type="file" name="profile_pic" id="userIcon" accept="image/tiff,image/jpg,image/jpeg,image/png,image/bmp"/>
                        <button type="button" value="Create New User" onClick={createUser}>Create New User</button>
                        <p id='message'></p>
                    </form>
                </div>
            </div>

            <div className="login">
                <div className="form">
                    <form className="login-form">
                        <span >Login</span>
                        <input type="text" id="existingUserName" name="existingUserName" placeholder="Enter your username" required={true} />
                        <UserProvider value={user}>
                            <button type="button" value="Login" onClick={loginUser}>Login</button>
                        </UserProvider>
                        <p id='loginMsg'></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginWindow;