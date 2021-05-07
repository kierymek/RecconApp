import axios from 'axios'
import React, { useContext, useState } from 'react'
import FindUser from '../components/FindUser'
import SingleUser from './SingleUser'
const Cluster = () => {
    const [users, setUsers] = useState("");
    const [cost, setCost] = useState("");
    //klaster musi znac swoje id
    //const clusterId = this.props.clusterId;
    const handleSubmit = async (e) => {
        //nwm jak info z cookies wyciagnac
        e.preventDefault();
        console.log("a");
    }
    //nwm gdzie wywowalc te funckje na poczatku
    const getData = async () => {

        try {
            const response = axios.get('jakis jebany endpint z ktorego dostane wybrany cluster /clusters/:custerId');
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            {/* Wypisanie znajomych i ich zobowiązań */}
            <div>

                <table className="table caption-top table-secondary">
                    <tbody>
                        {/* {users.map(user => { <SingleUser first_name={user.first_name} last_name={user.last_name} debt={user.debt}/> })} */}


                    </tbody>
                </table>
            </div>
            {/* Dodanie swojego zobowiązania*/}
            <form action="" onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="cost">Twoje wpłaty</label>
                        {<input value={cost} onChange={e => setCost(e.target.value)} size="50" id="cost" className="form-control" required />}
                    </div>

                    <button type="submit" className="btn btn-primary">Dodaj swoje koszta</button>
                </form>
            {/* Dodanie znajomego */}
            {/* <FindUser/> */}
        </div>
    )
}

export default Cluster
