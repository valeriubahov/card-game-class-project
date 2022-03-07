const LoginWindow = function(props)
{

    return(

        <form id="loginPage">
        <label for="username">Please Enter your Username:</label><br></br>
        <input type="text" id="username" name="username"></input><br></br>
        <input type="submit"></input>
        </form>

    )
}

export default LoginWindow;