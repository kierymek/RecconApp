import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import Navbar from "../components/Navbar";
import { getCookie, printAlert } from "../context/Functions";
import { ReconsContext } from "../context/ReconsContext";

const ReckonDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const [loggedUser, setLoggedUser] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [payments, setPayments] = useState([]);
  const [paymentDate, setPaymentDate] = useState("");
  const { selectedRecon } = useContext(ReconsContext);
  const [currentRecon, setCurrentRecon] = useState(selectedRecon);

  const { reckonId } = useParams();
  //   const [loggedUser, setLoggedUser] = useState("");

  const handleOnAddReckon = async (e) => {
    e.preventDefault();
    try {
      const response = await ReconsFinder.post(
        "reckonings/reckoningPosition",
        {
          name,
          amount,
          groupmemberid: loggedUser.userid,
          /**Gdy reckonId bedzie poprawnie stwaiane, to trzeba tu to dac */
          reckoningid: reckonId,
          paymentdate: paymentDate + "T00:00:00Z",
        },
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );
      history.push("/");
      history.push(location);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await ReconsFinder.get("auth/logged", {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        setLoggedUser(responseUser.data);
        const response = await ReconsFinder.get(
          `reckonings/reckoningPosition/${reckonId}`,
          {
            headers: {
              jwt: getCookie("jwt"),
            },
          }
        );

        setPayments(
          response.data.map((payment) => {
            return (
              <tr key={payment.reckoningpositionid}>
                <td>{payment.name}</td>
                <td>{payment.groupmemberid}</td>
                <td>{payment.amount}</td>
                <td>
                  {payment.paymentdate
                    ? payment.paymentdate.split("T", 1)
                    : "Nie podano"}
                </td>
              </tr>
            );
          })
        );
        // console.log(payments);
      } catch (e) {
        console.log(e);
        printAlert(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-center display-2" style={{ paddingBottom: "30px" }}>
        <h1>Szczegóły rachunku</h1>
        <h5>Tytuł: {currentRecon.name || "brak"}</h5>
        <h5>właściciel: {currentRecon.author || "brak"}</h5>
        <h5>
          termin płatności: {currentRecon.deadline?.split("T", 1) || "brak"}
        </h5>
      </div>

      <div className="row">
        <div className="col mb-2 text-left">
          <form action="" onSubmit={(e) => handleOnAddReckon(e)}>
            <div className="form-col" style={{ maxWidth: "250px" }}>
              <div className="form-group">
                <label htmlFor="name">Tytuł płatności</label>
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
                <label htmlFor="name">Kwota</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  id="name"
                  type="number"
                  className="form-control"
                  min={0}
                  required
                />
              </div>
              <div className="form-group" style={{ marginRight: "20px" }}>
                <p>termin płatności</p>
                <input
                  type="date"
                  id="start"
                  name="recon-start"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                  max="2022-12-31"
                  required
                ></input>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Dodaj płatność do rachunku
            </button>
          </form>
        </div>
        <div className="col">
          <table className="table table-warning table-hover">
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Wpłacający</th>
                <th scope="col">Kwota</th>
                <th scope="col">Data zapłaty</th>
              </tr>
            </thead>
            <tbody>{payments}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReckonDetails;
