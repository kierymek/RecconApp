import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";

const LogUser = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ReconsFinder.post("/auth/login", {
        password,
        email,
      });
      console.log(response);
      document.cookie = `jwt=${response.data.jwt}`;
      // setSelectedClient(response.data.data);
      console.log(document.cookie);
      history.push("/userPanel");
    } catch (e) {
      console.log(e);
      if (e.response !== undefined) {
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
    // try {
    //     const response = await ReconsFinder.get(`/clients/login/${nickname}/${password}`);
    //     if (response.data.status === "success") {
    //         history.push(`/clients/${response.data.data.client.id_klient}/reservations`);
    //     } else {
    //         alert("No such a user! Wrong login or password!")
    //     }
    // } catch (e) {
    //     console.log(e);
    //     // alert("No such a user! Wrong login or password!")
    // }

    // const response = await ReconsFinder.get("logged");
    // console.log("Loguser response: ", response);
  };

  return (
    <div>
      <h1>Panel logowania</h1>
      <br />
      <div style={{ width: "60%" }}>
        <h4 style={{ marginBottom: "20px" }}>Istniejący użytkownik</h4>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="50"
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
              size="50"
              id="password"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogUser;
