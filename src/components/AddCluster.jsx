import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { getCookie, printAlert } from "../context/Functions";

const AddCluster = ({ loggedUser }) => {
  const history = useHistory();

  const [name, setName] = useState("");

  const handleAddCluster = async (e) => {
    e.preventDefault();
    try {
      const createClusterResponse = await ReconsFinder.post(
        "groups/group",
        {
          name,
        },
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );
      const addUserResponse = await ReconsFinder.post(
        "groups/groupmembers",
        {
          groupid: createClusterResponse.data.groupid,
          userid: loggedUser.userid,
        },
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );
      history.push("/");
      history.push("/ClusterPanel");
    } catch (e) {
      printAlert(e);
    }
  };

  return (
    <>
      <br />
      <div className="mb-2 text-left">
        <form action="" onSubmit={handleAddCluster}>
          <h2>Nowa grupa</h2> <br />
          <div className="form-col" style={{ maxWidth: "250px" }}>
            <div className="form-group">
              <label htmlFor="name">Nazwa grupy</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                className="form-control"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Utwórz grupę
          </button>
        </form>
      </div>
      <br />
    </>
  );
};

export default AddCluster;
