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
  const [debtor, setDebtor] = useState("");
  const [amount, setAmount] = useState(0);
  const [payments, setPayments] = useState([]);
  const [paymentDate, setPaymentDate] = useState("");
  const { selectedRecon, groupMembers, setGroupMembers } =
    useContext(ReconsContext);
  const [currentRecon, setCurrentRecon] = useState(selectedRecon);

  const { reckonId } = useParams();
  //   const [loggedUser, setLoggedUser] = useState("");

  const changeToPaid = async (e, reckoningpositionid) => {
    try {
      const response = await ReconsFinder.put(
        "/reckonings/UpdateReckoningStatusView",
        {
          reckoningpositionid,
        },
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );

      // console.log(response);
      history.push("/");
      history.push(location);
    } catch (e) {
      console.log(e);
    }
  };
  const handleOnAddReckon = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await ReconsFinder.get(`/auth/logged`, {
        headers: {
          jwt: getCookie("jwt"),
        },
      });
      console.log(
        "userResponse: ",
        userResponse,
        "currentRecon: ",
        currentRecon,
        currentRecon.userid
      );
      // if (userResponse.data.userid !== currentRecon.author_detail.userid) {
      //   alert(
      //     "Nie możesz dodawać pozycji do rachunku nie będąc jego właścicielem!"
      //   );
      //   return;
      // }
      const response = await ReconsFinder.post(
        "reckonings/reckoningPosition",
        {
          name,
          amount,
          groupmemberid: debtor,
          reckoningid: reckonId,
          paymentdate: null,
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
      printAlert(e);
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
        const reconResponse = await ReconsFinder.get(
          `/reckonings/reckoning/${reckonId}`,
          {
            headers: {
              jwt: getCookie("jwt"),
            },
          }
        );
        !currentRecon && setCurrentRecon(reconResponse.data);
        console.log("payments: ", response.data);
        console.log("current recon: ", reconResponse.data);
        setPayments(
          response.data.map((payment) => {
            return (
              <tr key={payment.reckoningpositionid}>
                <td>{payment.name}</td>
                <td>{payment.author_detail.email}</td>
                <td>{payment.amount}</td>
                <td>
                  {payment.paymentdate
                    ? payment.paymentdate.split("T", 1)
                    : "Nie opłacono"}
                </td>
                <td>
                  {payment.paymentdate ? (
                    <span className="h5" style={{ color: "green" }}>
                      Zapłacono
                    </span>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-dark  btn-large btn-block"
                      onClick={(e) =>
                        changeToPaid(e, payment.reckoningpositionid)
                      }
                    >
                      Opłać
                    </button>
                  )}
                </td>
              </tr>
            );
          })
        );

        if (!groupMembers.length) {
          const membersResponse = await ReconsFinder.get(
            `/groups/group/${reconResponse.data?.groupid}`,
            {
              headers: {
                jwt: getCookie("jwt"),
              },
            }
          );
          setGroupMembers(
            membersResponse.data.members.filter(
              (member) => member.userid !== responseUser.data.userid
            )
          );
          console.log(
            "available members: ",
            membersResponse.data.members.filter(
              (member) => member.userid !== responseUser.data.userid
            )
          );
        }

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
        <h5>właściciel: {currentRecon.author_detail?.email || "brak"}</h5>
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
              {/* <div className="form-group" style={{ marginRight: "20px" }}>
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
              </div> */}
              <div className="form-group">
                <label htmlFor="debtor">Kogo obciążyć</label>
                <select
                  className="form-control"
                  id="debtor"
                  onChange={(e) => setDebtor(e.target.value)}
                  required
                >
                  <option value="" disabled selected>
                    Wybierz dłużnika
                  </option>
                  {groupMembers.length &&
                    groupMembers.map((member) => (
                      <option key={member.userid} value={member.userid}>
                        {member.email}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Dodaj płatność do rachunku
            </button>
          </form>
        </div>
        <div className="col">
          <table className="table table-warning table-hover">
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Dłużnik</th>
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
