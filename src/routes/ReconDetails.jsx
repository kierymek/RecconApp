import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { getCookie, printAlert } from "../context/Functions";

const ReckonDetails = () => {
  const history = useHistory();
  const [loggedUser, setLoggedUser] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [payments, setPayments] = useState([]);

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
          reckoningid: 30,
          paymentdate: null,
        },
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );
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
          `reckonings/reckoningPosition/30`,
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
                  {payment.paymentdate ? payment.paymentdate : "Nie podano"}
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
      <div>
        <div className="mb-2 text-left">
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
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Dodaj płatność do rachunku
            </button>
          </form>
        </div>
        <table className="table table-primary table-hover">
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
    </>
  );
};

export default ReckonDetails;
