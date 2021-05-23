import React, { useEffect, useState } from "react";
import AddCluster from "../components/AddCluster";
import Cluster from "../components/Cluster";
import ReconsFinder from "../apis/ReconsFinder";
import { getCookie, printAlert } from "../context/Functions";
import Navbar from "../components/Navbar";

const ClusterPanel = () => {
  const [groups, setGroups] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReconsFinder.get("auth/logged", {
          headers: {
            jwt: getCookie("jwt"),
          },
        });
        const groupsResponse = await ReconsFinder.get(
          `/groups/groupinfo/${response.data.userid}`,
          {
            headers: {
              jwt: getCookie("jwt"),
            },
          }
        );
        console.log(response);
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
      <AddCluster />
      <Cluster clusters={groups} />
    </div>
  );
};

export default ClusterPanel;
