import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import AddRecon from "../components/AddRecon";
import Navbar from "../components/Navbar";
import FindUser from "../components/FindUser";
import { getCookie, printAlert } from "../context/Functions";
import { ReconsContext } from "../context/ReconsContext";

const ClusterDetails = () => {
  const { groupid } = useParams();
  const [details, setDetails] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [members, setMembers] = useState("");
  const [recons, setRecons] = useState("");
  const { foundUsers } = useContext(ReconsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReconsFinder.get(`/groups/group/${groupid}`, {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        const userResponse = await ReconsFinder.get(`/auth/logged`, {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        const reconsResponse = await ReconsFinder.get(
          `reckonings/reckonings_in_group/${groupid}`,
          {
            headers: {
              jwt: getCookie("jwt"),
            },
          }
        );
        setLoggedUser(userResponse.data);
        console.log("recons: ", reconsResponse.data);
        reconsResponse.data.length &&
          setRecons(
            reconsResponse.data.map((recon) => {
              return (
                <tr key={recon.reckoningid}>
                  <td>{recon.name}</td>
                  <td>{recon.author}</td>
                  <td>{recon.deadline.split("T", 1)}</td>
                  <td>{recon.payment_status}</td>
                </tr>
              );
            }) || (
              <tr>
                <td>Brak rachunków</td>
              </tr>
            )
          );

        setDetails(response.data);
        console.log(response.data);
        if (response.data.members) {
          console.log("członkowie: ", response.data.members);
          setMembers(
            response.data.members.map((member) => {
              return (
                <tr key={member.userid}>
                  <td>{member.firstname}</td>
                  <td>{member.lastname}</td>
                  <td>{member.email}</td>
                </tr>
              );
            }) || (
              <tr>
                <td>Brak członków</td>
              </tr>
            )
          );
        }
      } catch (e) {
        console.log(e);
        printAlert(e);
      }
    };
    fetchData();
  }, []);
  console.log(getCookie("jwt"));

  return (
    <div>
      <Navbar />
      <h1 className="text-center display-2" style={{ paddingBottom: "30px" }}>
        Panel grupy
      </h1>
      <h1
        className="font-weight-bold display-3 text-center"
        style={{ paddingBottom: "30px" }}
      >
        {details.name}
      </h1>
      <div className="text-white bg-secondary">
        <div className="row " style={{ padding: "20px" }}>
          <div className="col">
            <AddRecon groupid={groupid} loggedUser={loggedUser} />
            <FindUser groupid={groupid} />
          </div>
          <div
            className="col"
            style={{
              textAlign: "center",
              justifyContent: "center",
              paddingTop: "30px",
            }}
          >
            <table className="table table-info">
              <thead>
                <tr>
                  <th scope="col">tytuł</th>
                  <th scope="col">autor</th>
                  <th scope="col">termin</th>
                  <th scope="col">status</th>
                </tr>
              </thead>
              <tbody>{recons}</tbody>
            </table>
            <br />
            <table className="table table-info">
              <thead>
                <tr>
                  <th scope="col">imie</th>
                  <th scope="col">nazwisko</th>
                  <th scope="col">email</th>
                </tr>
              </thead>
              <tbody>{members}</tbody>
            </table>
          </div>
        </div>
        <div className="row row-cols-3 mb-2" style={{ padding: "20px" }}>{foundUsers}</div>
      </div>
      <ReckonDetails></ReckonDetails>
    </div>
  );
};

export default ClusterDetails;
