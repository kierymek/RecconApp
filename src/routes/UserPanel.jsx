import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { ReconsContext } from "../context/ReconsContext";
import { getCookie, printAlert } from "../context/Functions";
import Cluster from "../components/Cluster";
import FindUser from "../components/FindUser";
import Navbar from "../components/Navbar";

const UserPanel = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [loggedUser, setLoggedUser] = useState("");
  const [reckonings, setReckonings] = useState("");

  //   const { idClient } = useParams();
  //   const { selectedClient, setSelectedClient } = useContext(ReconsContext);
  //   const { selectedReservations, setSelectedReservations } = useContext(
  //     ReconsContext
  //   );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReconsFinder.get("auth/logged", {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        console.log("jwt: ", getCookie("jwt"));
        const reckoningsResponse = await ReconsFinder.get(
          "reckonings/reckoningPositionsByUser/2",
          {
            headers: {
              jwt: getCookie("jwt"),
            },
          }
        );
        console.log(response.data);
        console.log(reckoningsResponse.data);
        setLoggedUser(response.data);
        setReckonings(reckoningsResponse.data);
      } catch (e) {
        printAlert(e);
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
      history.push("/EditUser");
    } catch (err) {
      printAlert(err);
    }
  };

  let income = 0;
  let outcome = 0;
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
                <caption><div classname="row"><span>Dane użytkownika</span><button
                onClick={(e) => handleEdit(e)}
                className="btn btn-primary"
                style={{float:"right"}}
              >
                Edytuj dane
              </button></div></caption>
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
                    <th scope="col">User ID</th>
                    <td>{loggedUser.userid}</td>
                  </tr>
                  <tr>
                    <th scope="col">Email</th>
                    <td>{loggedUser.email}</td>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="col-4">
              <h3>Rachunki gdzie jesteśmy dłużnikiem</h3>
              <table className="table table-primary table-hover">
                <thead>
                  <tr>
                    <th scope="col">tytuł</th>
                    <th scope="col">kwota</th>
                    <th scope="col">data</th>
                  </tr>
                </thead>
                <tbody>
                  {reckonings.length &&
                    reckonings.map((recon) => {
                      outcome += recon.amount;
                      return (
                        <tr key={recon.reckoningpositionid}>
                          <td>{recon.name}</td>
                          <td>{recon.amount}</td>
                          <td>{recon.paymentdate}</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td>{"sum"}</td>
                    <td>{outcome}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-4">
              <h3>Rachunki których jesteśmy właścicielem</h3>
              <table className="table table-primary table-hover">
                <thead>
                  <tr>
                    <th scope="col">tytuł</th>
                    <th scope="col">kwota</th>
                    <th scope="col">data</th>
                  </tr>
                </thead>
                <tbody>
                  {reckonings.length &&
                    reckonings.map((recon) => {
                      income += recon.amount;
                      return (
                        <tr key={recon.reckoningpositionid}>
                          <td>{recon.name}</td>
                          <td>{recon.amount}</td>
                          <td>{recon.paymentdate}</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td>{"sum"}</td>
                    <td>{income}</td>
                    <td></td>
                  </tr>
                </tbody>
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
