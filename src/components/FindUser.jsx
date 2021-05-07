import axios from 'axios';
import React, { useContext, useState } from 'react'
//import { useHistory, useParams } from 'react-router-dom';
import ReconsFinder from '../apis/ReconsFinder';


//const history = useHistory();

const FindUser = () => {
    const [email, setEmail] = useState("");
    const [foundUser, setFoundUser] = useState("");
    
    const handleAddingToCluster = async (e) =>{
        try {
            //od danego klastra otrzumyjemy jego clusterId i wysyłamy go razem w danymi użytkownika na serwer
            
            // const response = await  ReconsFinder.post("jakis endpoint dodajacy uzytkownika do klastra", {
            //     cluster : this.props.clusterId,
            //     first_name : foundUser.first_name,
            //     last_name : foundUser.last_name,
            //     username : foundUser.username,
            //     email : foundUser.email,
            // });
            // console.log(response.data);
            // history.push("/");
        } catch(e){
            console.log(e);
        }
    }

    /**Poprawne obsluzenie geta musi byc - nie znam endpointa */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFoundUser({ first_name: email, last_name: "L", email: "E", username: "U" });
        // try{
        // const response = await axios.get('')
        // console.log(response.data);
        // setFoundUser(response.data);
        // }catch(e){
        //     console.log(e);
        //     alert(e);
        // }
    }
    return (
        <div>
            <h1>Wyszukaj Użytkownika</h1><br />
            <div style={{ width: "60%" }}>
                <h4 style={{ marginBottom: "20px" }}>Wprowadź email</h4>
                <form action="" onSubmit={handleSubmit} >
                    <div className="form-group">
                        {/* <label htmlFor="email">username</label> */}
                        {<input value={email} onChange={e => setEmail(e.target.value)} size="50" id="email" className="form-control" required />}
                    </div>


                    <button type="submit" className="btn btn-primary">Szukaj</button>
                </form>
                <p></p> {/*To nie powinno tak być*/}
                {foundUser &&
                    <div>

                        <table className="table caption-top table-secondary">
                            <tbody>
                                <tr>
                                    <td>Imię:</td>
                                    <td>{foundUser.first_name}</td>
                                </tr>
                                <tr>
                                    <td>Nazwisko:</td>
                                    <td>{foundUser.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{foundUser.email}</td>
                                </tr>
                                <tr>
                                    <td>Pseudonim:</td>
                                    <td>{foundUser.username}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={handleAddingToCluster} className="btn btn-danger">Dodaj użytkownika do klastra</button>
                    </div>
                    
                }
            </div>
        </div>
    )
}

export default FindUser
