import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import AddRecon from "../components/AddRecon";
import Navbar from "../components/Navbar";
import FindUser from "../components/FindUser";
import { getCookie, printAlert } from "../context/Functions";
import { ReconsContext } from "../context/ReconsContext";

const ClusterDetails = () => {
  const history = useHistory();
  const { groupid } = useParams();
  const [details, setDetails] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [members, setMembers] = useState("Ładowanie...");
  const [recons, setRecons] = useState("Ładowanie...");
  const { foundUsers, setSelectedRecon, setGroupMembers } =
    useContext(ReconsContext);

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

        const recons = reconsResponse.data.map((recon) => {
          return (
            <tr
              key={recon.reckoningid}
              onClick={(e) => {
                history.push(`/ReckonDetails/${recon.reckoningid}`);
                setSelectedRecon(recon);
              }}
            >
              <td>{recon.name}</td>
              <td>{recon.author_detail.email}</td>
              <td>{recon.deadline.split("T", 1)}</td>
              <td>
                {recon.payment_status == "PARTIAL" ? (
                  <h6 style={{ color: "blue" }}>Częściowo</h6>
                ) : recon.payment_status == "True" ? (
                  <h6 style={{ color: "green" }}>Zapłacone</h6>
                ) : (
                  <h6 style={{ color: "red" }}>Niezapłacone</h6>
                )}
              </td>
            </tr>
          );
        });
        setRecons(
          recons.length ? (
            recons
          ) : (
            <tr>
              <td>Brak rachunków</td>
            </tr>
          )
        );

        setDetails(response.data);
        setGroupMembers(
          response.data.members.filter(
            (member) => member.userid !== userResponse.data.userid
          )
        );
        const members = response.data.members.map((member) => {
          return (
            <tr key={member.userid}>
              <td>{member.firstname}</td>
              <td>{member.lastname}</td>
              <td>{member.email}</td>
            </tr>
          );
        });
        setMembers(
          members.length ? (
            members
          ) : (
            <tr>
              <td>Brak członków</td>
            </tr>
          )
        );
      } catch (e) {
        printAlert(e);
      }
    };
    fetchData();
  }, []);

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
            <h4>Bieżące rachunki</h4>
            <p>(kliknij na rachunek abyz zobaczyć jego szczegóły)</p>
            <table className="table table-info table-hover">
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
            <h4>Członkowie</h4>
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
        <div className="row row-cols-3 mb-2" style={{ padding: "20px" }}>
          {foundUsers}
        </div>
      </div>
    </div>
  );
};

export default ClusterDetails;
