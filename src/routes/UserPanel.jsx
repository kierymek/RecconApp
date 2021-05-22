import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { ReconsContext } from "../context/ReconsContext";
import Cluster from "../components/Cluster";
import FindUser from "../components/FindUser";
import Navbar from "../components/Navbar";
const UserPanel = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [loggedUser, setLoggedUser] = useState("");

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
        const response = await ReconsFinder.get("/auth/logged", {
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
  //   const handleDelete = async (e, id) => {
  //     try {
  //       const response = await ReconsFinder.delete(`/reservations/${id}`);
  //       setSelectedReservations(
  //         selectedReservations.filter((reservation) => {
  //           return reservation.id_rezerwacja !== id;
  //         })
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const handleEdit = async (e) => {
    try {
      history.push("/userDataEditPanel");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {
        <>
          <h1
            className="text-center display-2"
            style={{ paddingBottom: "30px" }}
          >
            Panel Użytkownika
          </h1>
          <div className="row">
            <div className="col-4">
              <table className="table caption-top table-secondary">
                <caption>Dane użytkownika</caption>
                <thead>
                  <tr>
                    <th scope="col">Imię</th>
                    <td>{loggedUser.firstname}</td>
                  </tr>
                  <tr>
                    <th scope="col">Nazwisko</th>
                    <td>{loggedUser.lastname}</td>
                  </tr>
                  <tr>
                    <th scope="col">Username</th>
                    <td>{loggedUser.username}</td>
                  </tr>
                  <tr>
                    <th scope="col">Email</th>
                    <td>{loggedUser.email}</td>
                  </tr>
                </thead>
              </table>
              <button
                onClick={(e) => handleEdit(e)}
                className="btn btn-primary"
              >
                Edytuj dane
              </button>
            </div>
            <div className="col-8">
              <h3>Rachunki</h3>
              <table className="table table-primary table-hover">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">użytkownik</th>
                    <th scope="col">grupa</th>
                    <th scope="col">bilans</th>
                    <th scope="col">zapłacono</th>
                    <th scope="col">Zmień status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </>
      }
      <div>
        <FindUser />
      </div>
      <div>
        <Cluster
          clusters={[
            { groupid: 1, name: "Aa", startdate: "111Taaa" },
            { groupid: 2, name: "Aa", startdate: "111Taaa" },
            { groupid: 3, name: "Aa", startdate: "111Taaa" },
          ]}
        />
      </div>
    </div>
  );
};

export default UserPanel;
