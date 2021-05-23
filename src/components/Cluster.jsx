import React from "react";
import { useHistory } from "react-router-dom";
const Cluster = ({ clusters }) => {
  const history = useHistory();
  function moveToDetails(groupid) {
    console.log(groupid);
    history.push(`/clusterDetails/${groupid}`);
  }
  return (
    <div>
      <h1>Moje grupy</h1>
      <div className="row row-cols-3 mb-2">
        {clusters.length &&
          clusters.map((cluster) => {
            return (
              <div
                key={cluster.groupid}
                className="card text-white bg-secondary mb-3 mr-4"
                style={{ maxWidth: "30%" }}
                onClick={() => moveToDetails(cluster.groupid)}
              >
                <div className="card-header d-flex justify-content-between">
                  <span>Nazwa grupy: </span>
                  <span>{cluster.name}</span>
                </div>
                <div className="card-body d-flex justify-content-between">
                  <span>Data: </span>
                  <span className="card-text ">
                    {cluster.startdate.split("T", 1)}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cluster;
