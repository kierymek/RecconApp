import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import {printAlert} from "../context/Functions"; 

const Register = () => {
  const { idHotel, idOption } = useParams();
  const history = useHistory();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await ReconsFinder.post("auth/register", {
        firstname: name,
        lastname: surname,
        password,
        email,
      });
      setSelectedClient(response.data.data);
      history.push("/");
    } catch (e) {
      printAlert(e);
    }
  };

  return (
    <>
      <h1 className="font-weight-bold display-3 text-center">
        Panel rejestracji
      </h1>
      <br />
      <div className="mb-2 text-left">
        <form action="" onSubmit={handleRegister}>
          <h2>Nowy użytkownik</h2> <br />
          <div className="form-col" style={{ maxWidth: "250px" }}>
            <div className="form-group">
              <label htmlFor="name">Imię</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Nazwisko</label>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                id="surname"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="form-control"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-danger">
            Zarejestruj
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
