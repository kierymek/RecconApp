import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReconsFinder from "../apis/ReconsFinder";
import { getCookie, printAlert } from "../context/Functions";

const AddRecon = ({ groupid, loggedUser }) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("2021-05-23");

  const handleAddRecon = async (e) => {
    e.preventDefault();
    try {
      const response = await ReconsFinder.post(
        "reckonings/reckoning",
        {
          name,
          deadline: deadline + "T00:36:00Z",
          groupid,
          author: loggedUser.userid,
        },
        {
          headers: {
            jwt: getCookie("jwt"),
          },
        }
      );
      console.log(response.data);
      history.push("/ClusterPanel");
    } catch (e) {
      printAlert(e);
    }
  };

  return (
    <>
      <br />
      <div className="mb-2 text-left">
        <form action="" onSubmit={handleAddRecon}>
          <h2>Dodawanie nowego rachunku</h2> <br />
          <div className="form-col" style={{ maxWidth: "250px" }}>
            <div className="form-group">
              <label htmlFor="name">Tytuł rachunku</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group" style={{ marginRight: "20px" }}>
              <p>termin płatności</p>
              <input
                type="date"
                id="start"
                name="recon-start"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
                max="2022-12-31"
              ></input>
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Utwórz rachunek
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRecon;
