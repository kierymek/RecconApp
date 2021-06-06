import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { ReconsContext } from "../context/ReconsContext";
import { getCookie, printAlert } from "../context/Functions";
import Cluster from "../components/Cluster";
import FindUser from "../components/FindUser";
import Navbar from "../components/Navbar";

const UserPanel = () => {
  const history = useHistory();
  const location = useLocation();
  const [loggedUser, setLoggedUser] = useState("");
  const [reckoningsOwner, setReckoningsOwner] = useState("");
  const [reckoningsDebtor, setReckoningsDebtor] = useState("");
  const [groups, setGroups] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReconsFinder.get("auth/logged", {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        console.log("jwt: ", getCookie("jwt"));
        const reckoningsResponseOwner = await ReconsFinder.get(
          `reckonings/reckoningPositionsByUser/${response.data.userid}`,
          {
            headers: {
              jwt: getCookie("jwt"),
            },
          }
        );
        const reckoningsResponseDebtor = await ReconsFinder.get(
          `reckonings/reckoningPositionsForUser/${response.data.userid}`,
          {
            headers: {
              jwt: getCookie("jwt"),
            },
          }
        );
        console.log("users data", response.data);
        console.log(
          "Rachunki użytkownika: ",
          reckoningsResponseOwner.data,
          reckoningsResponseDebtor.data
        );
        setLoggedUser(response.data);
        setReckoningsOwner(reckoningsResponseOwner.data);
        setReckoningsDebtor(reckoningsResponseDebtor.data);

        const groupsResponse = await ReconsFinder.get(
          `/groups/groupinfo/${response.data.userid}`,
          {
            headers: {
              jwt: getCookie("jwt"),
            },
          }
        );
        console.log(groupsResponse);
        setGroups(groupsResponse.data);
      } catch (e) {
        printAlert(e);
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (e) => {
    try {
      history.push("/EditUser");
    } catch (err) {
      printAlert(err);
    }
  };

  let income = 0;
  let outcome = 0;
  const reconingIncome = (reckoningsOwner.length &&
    reckoningsOwner.map((recon) => {
      income += recon.amount;
      return (
        <tr key={recon.reckoningpositionid}>
          <td>{recon.name}</td>
          <td>{recon.amount}</td>
          <td>{recon.paymentdate?.split("T", 1) || "nie opłacono"}</td>
        </tr>
      );
    })) || (
    <tr>
      <td>Brak pozycji</td>
    </tr>
  );
  const reconingsOutcome = (reckoningsDebtor.length &&
    reckoningsDebtor.map((recon) => {
      outcome += recon.amount;
      return (
        <tr key={recon.reckoningpositionid}>
          <td>{recon.name}</td>
          <td>{recon.amount}</td>
          <td>{recon.paymentdate?.split("T", 1)  || "nie opłacono"}</td>
        </tr>
      );
    })) || (
    <tr>
      <td>Brak pozycji</td>
    </tr>
  );
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
                <caption>
                  <div classname="row">
                    <span>Dane użytkownika</span>
                    <button
                      onClick={(e) => handleEdit(e)}
                      className="btn btn-primary"
                      style={{ float: "right" }}
                    >
                      Edytuj dane
                    </button>
                  </div>
                </caption>
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
              <h3>Pozycje w rachunkach, gdzie jesteśmy dłużnikiem</h3>
              <table className="table table-primary table-hover">
                <thead>
                  <tr>
                    <th scope="col">tytuł</th>
                    <th scope="col">kwota</th>
                    <th scope="col">data</th>
                  </tr>
                </thead>
                <tbody>
                  {reconingsOutcome}
                  <tr>
                    <td>{"bilans"}</td>
                    <td>{outcome}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-4">
              <h3>Pozycje w rachunkach, gdzie jesteśmy właścicielem</h3>
              <table className="table table-primary table-hover">
                <thead>
                  <tr>
                    <th scope="col">tytuł</th>
                    <th scope="col">kwota</th>
                    <th scope="col">data</th>
                  </tr>
                </thead>
                <tbody>
                  {reconingIncome}
                  <tr>
                    <td>{"bilans"}</td>
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
        <Cluster clusters={groups} />
      </div>
    </div>
  );
};

export default UserPanel;
