import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import ReconsFinder from '../apis/ReconsFinder';

const UserDataEditPanel = () => {
    const history = useHistory();

    const [loggedUser, setLoggedUser] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nickname, setNickname] = useState("łysa pała 69");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);

  //   const { idClient } = useParams();
  //   const { selectedClient, setSelectedClient } = useContext(ReconsContext);
  //   const { selectedReservations, setSelectedReservations } = useContext(
  //     ReconsContext
  //   );

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReconsFinder.get("/logged", {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        console.log(response.data);
        setLoggedUser(response.data);
      } catch (e) {
        console.log(e);
        if (e.response !== undefined) {
          console.log(e.response);
          const responseText = JSON.parse(e.response.request.responseText);
          let response = "";
          for (const [key, value] of Object.entries(responseText)) {
            response += "input name -> " + key + "\ninput errors:  ";
            if (typeof value === "string") {
              response += value + "\n";
              continue;
            }
            for (const message of Object.values(value)) {
              response += message + "\n";
            }
            response += "\n";
          }
          alert(response);
        }
      }
    };
    fetchData();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await ReconsFinder.post("register", {
        first_name: name,
        last_name: surname,
        username: nickname,
        password,
        email,
      });
      console.log(response.data);
      setSelectedClient(response.data.data);
      history.push("/");
    } catch (e) {
      console.log(e);
      if (e.response.data !== undefined) {
        console.log(e.response);
        const responseText = JSON.parse(e.response.request.responseText);
        let response = "";
        for (const [key, value] of Object.entries(responseText)) {
          response += "input name -> " + key + "\ninput errors:  ";
          for (const message of Object.values(value)) {
            response += message + "\n";
          }
          response += "\n";
        }
        alert(response);
      }
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
              <label htmlFor="nickname">username</label>
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                id="nickname"
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
    )
}

export default UserDataEditPanel