import axios from "axios";
import React, { useContext, useState } from "react";
import {
  /*useHistory,*/ useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { getCookie } from "../context/Functions";
import { ReconsContext } from "../context/ReconsContext";
//const history = useHistory();

const FindUser = ({ groupid }) => {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const { setFoundUsers } = useContext(ReconsContext);

  async function addUserToCluster(user) {
    console.log(user);
    const addUserResponse = await ReconsFinder.post(
      "groups/groupmembers",
      {
        groupid,
        userid: user.userid,
      },
      {
        headers: {
          jwt: getCookie("jwt"),
        },
      }
    );
    console.log("added user: ", addUserResponse);
    history.push("/");
    history.push(location);
    //groupId
    try {
    } catch (e) {
      console.log(e);
      alert("Bład");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      setFoundUsers(
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
                    <button
                      type="submit"
                      onClick={() => addUserToCluster(user)}
                      className="btn btn-danger"
                    >
                      Dodaj do grupy
                    </button>
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
      <br />
      <h2>Wyszukaj Użytkownika</h2>
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

          <button
            className="btn btn-warning"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setFoundUsers(null);
            }}
          >
            Ukryj wyszukanych
          </button>
        </form>
        <p></p> {/*To nie powinno tak być*/}
      </div>
    </div>
  );
};

export default FindUser;
