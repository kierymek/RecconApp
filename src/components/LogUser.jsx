import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { printAlert } from "../context/Functions";

const LogUser = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ReconsFinder.post("auth/login", {
        password,
        email,
      });
      document.cookie = `jwt=${response.data.jwt}`;
      history.push("/userPanel");
    } catch (e) {
      printAlert(e);
    }
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
