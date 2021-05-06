import React from 'react'
import { useHistory } from 'react-router';

const NoAccount = () => {
    const history = useHistory();

    const handleNoAccout = async (e) => {
        e.preventDefault();
        history.push("/register");        
    }

    return (
        <div>
            <h1></h1><br/>
            <div>
                <h2>Nie masz jeszcze konta?</h2> <br/>
                <form action="" onSubmit={handleNoAccout} >
                <button type="submit" className="btn btn-danger">Rejestracja</button>
            </form>
            </div>
        </div>
    )
}

export default NoAccount;
