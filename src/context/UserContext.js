import { createContext, useState, useContext } from "react";

const UserContext = createContext({});

function UserProvider(props) {
    const [user, setUser] = useState(useContext(UserContext));

    return (
        <UserContext.Provider value={[user, setUser]} {...props} />
    )
}

export { UserProvider, UserContext };