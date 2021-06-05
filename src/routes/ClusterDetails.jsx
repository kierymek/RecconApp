import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import AddRecon from "../components/AddRecon";
import Navbar from "../components/Navbar";
import FindUser from "../components/FindUser";
import { printAlert } from "../context/Functions";

const ClusterDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const { groupid } = useParams();
  const [details, setDetails] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [members, setMembers] = useState("Brak członków");
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
        setLoggedUser(userResponse.data);

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
            })
          );
        }
        console.log(members);
        // history.push("/");
        // history.push(location);
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
      <h1 className="font-weight-bold display-3 text-center">{details.name}</h1>
      <div className="row text-white bg-secondary">
        <div className="col">
          <AddRecon groupid={groupid} loggedUser={loggedUser} />
          <FindUser groupid={groupid} />
        </div>
        <div className="col" style={{
          textAlign:"center", justifyContent:"center", paddingTop:"30px"}}>
          <table className="table table-primary table-hover">
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
    </div>
  );
};

export default ClusterDetails;
