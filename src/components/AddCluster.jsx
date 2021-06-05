import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { getCookie, printAlert } from "../context/Functions";

const AddCluster = ({ loggedUser }) => {
  const history = useHistory();

  const [name, setName] = useState("");
  // const [startDate, setStartDate] = useState("2021-06-05");

  const handleAddCluster = async (e) => {
    console.log("Jebać IOIOIIIOIOIOI");
    e.preventDefault();
    try {
      // console.log("start date: ", startDate);
      const createClusterResponse = await ReconsFinder.post(
        "groups/group",
        {
          name,
          // startdate: startDate + "T00:00:00Z",
        },
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );
      console.log(createClusterResponse.data);
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
      console.log(addUserResponse.data);
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
            {/* <div className="form-group" style={{ marginRight: "20px" }}>
              <p>Data utworzenia</p>
              <input
                type="date"
                id="start"
                name="trip-start"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
                max="2022-12-31"
              ></input>
            </div> */}
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
