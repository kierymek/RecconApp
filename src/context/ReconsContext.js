import React, {useState, createContext} from "react";

export const ReconsContext = createContext();

export const ReconsContextProvider = props => {
    const [foundUsers, setFoundUsers] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [selectedRecon, setSelectedRecon] = useState("");

    const addFoundUsers = (user) => {
        setFoundUsers([...foundUsers, user]);
    }

    return (
        <ReconsContext.Provider value={{foundUsers, setFoundUsers, addFoundUsers, selectedRecon, setSelectedRecon, groupMembers, setGroupMembers}}>
            {props.children}
        </ReconsContext.Provider>
    )
}