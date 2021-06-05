import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import AddRecon from "../components/AddRecon";
import Navbar from "../components/Navbar";
import FindUser from "../components/FindUser";

const ClusterDetails = () => {
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
          setMembers(
            response.data.members.map((member) => {
              <div
                className="col-sm"
                key={member.id}
                style={{ maxWidth: "30%" }}
              >
                <table className="table caption-top table-secondary">
                  <tbody>
                    <tr>
                      <td>Id:</td>
                      <td>{member.id}</td>
                    </tr>
                  </tbody>
                </table>
              </div>;
            })
          );
        }
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
  console.log("AAA", groupid);
  console.log(getCookie("jwt"));

  return (
    <div>
      <Navbar />
      <h1 className="text-center display-2" style={{ paddingBottom: "30px" }}>
        Panel grupy
      </h1>
      <h1 className="font-weight-bold display-3 text-center">{details.name}</h1>
      <div
        className="text-white bg-secondary mb-3 mr-2"
        style={{ padding: "5%" }}
      >
        <div>
          <AddRecon groupid={groupid} loggedUser={loggedUser} />
        </div>
        <div>
          <FindUser />
        </div>
      </div>
      <div className="display-4 text-center">{members}</div>
    </div>
  );
};

export default ClusterDetails;
