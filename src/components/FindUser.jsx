import axios from "axios";
import React, { useContext, useState } from "react";
import { /*useHistory,*/ useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";

//const history = useHistory();

const FindUser = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [users, setUsers] = useState(null);

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
  async function addUserToCluster(user) {
    console.log(user);
    const addUserResponse = await ReconsFinder.post(
      "groups/groupmembers",
      {
        groupid: null,
        userid: user.userid,
      },
      {
        headers: {
          jwt: getCookie("jwt"),
        },
      }
    );
    //groupId
    try {
    } catch (e) {
      console.log(e);
      alert("Bład");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ReconsFinder.get(
        `/auth/search?email=${email}&firstname=${firstName}&lastname=${lastName}`,
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );
      console.log(response.data);
      if (response.data.length == 0) alert("Brak użytkownika");
      setUsers(
        response.data.map((user) => {
          return (
            <div
              className="col-sm"
              key={user.userid}
              style={{ maxWidth: "30%" }}
            >
              <table className="table caption-top table-secondary">
                <tbody>
                  <tr>
                    <td>Imię:</td>
                    <td>{user.firstname}</td>
                  </tr>
                  <tr>
                    <td>Nazwisko:</td>
                    <td>{user.lastname}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{user.email}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <button
                        type="submit"
                        onClick={() => addUserToCluster(user)}
                        className="btn btn-secondary"
                      >
                        Dodaj do grupy
                      </button>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })
      );
    } catch (e) {
      console.log(e);
      alert("Nie znaleziono użytkownika");
    }
  };
  return (
    <div>
      <br/>
      <h1>Wyszukaj Użytkownika</h1>
      <br />
      <div style={{ width: "60%" }}>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-col" style={{ maxWidth: "250px" }}>
            <div className="form-group">
              {
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="50"
                  id="email"
                  className="form-control"
                  placeholder="Wyszukaj po emailu"
                />
              }
            </div>
            <div className="form-group">
              {
                <input
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  size="50"
                  id="firstName"
                  className="form-control"
                  placeholder="Wyszukaj po imieniu"
                />
              }
            </div>
            <div className="form-group">
              {
                <input
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  size="50"
                  id="lastName"
                  className="form-control"
                  placeholder="Wyszukaj po nazwisku"
                />
              }
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Szukaj
          </button>
        </form>
        <p></p> {/*To nie powinno tak być*/}
      </div>
      <div className="row row-cols-3 mb-2">{users}</div>
    </div>
  );
};

export default FindUser;
