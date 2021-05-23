import React from "react";
import ReconsFinder from "../apis/ReconsFinder";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
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

  const logout = async () => {
    try {
      const response = await ReconsFinder.get("/auth/logout", {
        headers: {
          jwt: getCookie("jwt"),
        },
      });
      console.log(response.data);
      document.cookie = "jwt=;";
      console.log(document.cookie);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/userPanel">
          ReckonApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "white" }}>
                Moje grupy
              </a>
            </li>
          </ul>
        </div>
        <div className="d-flex " style={{ float: "right" }}>
          <button className="btn btn-outline-warning" onClick={() => logout()}>
            Wyloguj
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
