import React from "react";
import { useHistory } from "react-router-dom";

const Cluster = ({ clusters }) => {
  const history = useHistory();
  function moveToDetails(groupid) {
    history.push(`/clusterDetails/${groupid}`);
  }
  return (
    <div>
      <br />
      <h1>Moje grupy:</h1>
      <p>(kliknij na grupę aby zobaczyć jej szczegóły)</p>
      <br />
      <div className="row row-cols-3 mb-2">
        {(clusters.length &&
          clusters.map((cluster) => {
            return (
              <div
                key={cluster.groupid}
                className="card text-white bg-success mb-3 mr-4"
                style={{ maxWidth: "30%" }}
                onClick={() => moveToDetails(cluster.groupid)}
              >
                <div className="card-header d-flex justify-content-between">
                  <span>Nazwa grupy: </span>
                  <span>{cluster.name}</span>
                </div>
                <div className="card-body d-flex justify-content-between">
                  <span>Utworzono: </span>
                  <span className="card-text ">
                    {cluster.startdate.split("T", 1) +
                      " " +
                      cluster.startdate.split("T")[1].split(".")[0]}
                  </span>
                </div>
              </div>
            );
          })) || <h4>Brak grup</h4>}
      </div>
    </div>
  );
};

export default Cluster;
