import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReconsFinder from "../apis/ReconsFinder";
import { getCookie, printAlert } from "../context/Functions";
import Navbar from "../components/Navbar";
const EditUser = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  //   const { idClient } = useParams();
  //   const { selectedClient, setSelectedClient } = useContext(ReconsContext);
  //   const { selectedReservations, setSelectedReservations } = useContext(
  //     ReconsContext
  //   );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReconsFinder.get("/logged", {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        console.log(response.data);
        setName(response.data.firstname);
        setSurname(response.data.lastname);
        setEmail(response.data.email);
      } catch (e) {
        console.log(e);
        printAlert(e);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await ReconsFinder.put(
        "auth/logged",
        {
          firstname: name,
          lastname: surname,
          password,
          email,
        },
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );
      console.log(response.data);
      document.cookie = `jwt=${response.data.jwt}`;
      history.push("/userPanel");
    } catch (e) {
      printAlert(e);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="font-weight-bold display-3 text-center">
        Edytuj dane użytkownika
      </h1>
      <br />
      <div className="mb-2 text-left">
        <form action="" onSubmit={handleUpdate}>
          <h2>Wprowadź nowe dane użytkownika</h2> <br />
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
            Edytuj dane
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
