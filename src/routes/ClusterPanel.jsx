import React, { useEffect, useState } from "react";
import AddCluster from "../components/AddCluster";
import Cluster from "../components/Cluster";
import ReconsFinder from "../apis/ReconsFinder";
import { getCookie, printAlert } from "../context/Functions";
import Navbar from "../components/Navbar";

const ClusterPanel = () => {
  const [groups, setGroups] = useState("");
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReconsFinder.get("auth/logged", {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        console.log(response);
        setLoggedUser(response.data);
        console.log("logged user: ", response.data);
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
        console.log(e);
        printAlert(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="font-weight-bold display-3 text-center">
        Zarządzaj swoimi grupami
      </h1>
      <AddCluster loggedUser={loggedUser} />
      <Cluster clusters={groups} />
    </div>
  );
};

export default ClusterPanel;
