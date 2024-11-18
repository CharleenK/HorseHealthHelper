import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { UsersContext } from "../contexts/UsersContext";

import { useNavigate, useParams } from "react-router-dom";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const HorseCare = () => {
  const { userData, setUserData } = useContext(UsersContext);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const [horse, setHorse] = useState("");
  const [dentalCare, setDentalCare] = useState([]);
  const [newDentalCare, setNewDentalCare] = useState({
    date: "",
    exam: "",
    float: "",
    comments: "",
  });
  const [hoofCare, setHoofCare] = useState([]);
  const [newHoofCare, setNewHoofCare] = useState({
    date: "",
    trim: "",
    shod: "",
    reset: "",
    comments: "",
  });
  const [parasiteControl, setParasiteControl] = useState([]);
  const [newParasiteControl, setNewParasiteControl] = useState({
    date: "",
    productUsed: "",
  });
  const [vaccinationHistory, setVaccinationHistory] = useState([]);
  const [newVaccinationHistory, setNewVaccinationHistory] = useState({
    date: "",
    vaccine: "",
    batchNumber: "",
  });
  const [diagnosticTesting, setDiagnosticTesting] = useState([]);
  const [newDiagnosticTesting, setNewDiagnosticTesting] = useState({
    date: "",
    condition: "",
    results: "",
  });

  let { id } = useParams();
  useEffect(() => {
    fetch(`/horse/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDentalCare(data.data.dentalCare);
        setHoofCare(data.data.hoofCare);
        setParasiteControl(data.data.parasiteControl);
        setVaccinationHistory(data.data.vaccinationHistory);
        setDiagnosticTesting(data.data.diagnosticTesting);
      });
  }, []);

  const handleHorseCare = (e, section, data) => {
    e.preventDefault();
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ section, data }),
    };
    fetch(`/horseCare/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (section === "dentalCare") {
          setDentalCare(data.data);
          setNewDentalCare({
            date: "",
            exam: "",
            float: "",
            comments: "",
          });
        } else if (section === "hoofCare") {
          setHoofCare(data.data);
          setNewHoofCare({
            date: "",
            trim: "",
            shod: "",
            reset: "",
            comments: "",
          });
        } else if (section === "parasiteControl") {
          setParasiteControl(data.data);
          setNewParasiteControl({ date: "", productUsed: "" });
        } else if (section === "vaccinationHistory") {
          setVaccinationHistory(data.data);
          setNewVaccinationHistory({
            date: "",
            vaccine: "",
            batchNumber: "",
          });
        } else if (section === "diagnosticTesting") {
          setDiagnosticTesting(data.data);
          setNewDiagnosticTesting({ date: "", condition: "", results: "" });
        } else {
          alert(data.error);
        }
      });
  };
  const handleDeleteHorse = (e, id) => {
    e.preventDefault();
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        nickName: userData.horses.find((horseObject) => horseObject._id === id)
          .nickName,
      }),
    };
    console.log(options.body);
    fetch(`/horse/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          let newHorseList = userData.horses.filter(
            (horseObject) => horseObject._id !== id
          );
          setUserData({ ...userData, horses: newHorseList });
          navigate("/horses");
        }
      });
  };
  // add delete horse message+ Are you sure etc
  //add loading message
  //change saved data input and checkboxes to <p> elements (you can use emojis!)
  return (
    <>
      <StyledMain>
        <MDBAccordion>
          <h1>{horse.nickName}</h1>
          <MDBAccordionItem collapseId={1} headerTitle="Dental Care">
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Exam</th>
                  <th scope="col">Float</th>
                  <th scope="col">Comments</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {dentalCare.map((row) => {
                  return (
                    <tr>
                      <th scope="row">
                        <p>{row.date}</p>
                      </th>
                      <td>
                        <p>{row.exam === "true" ? `✅` : `❌`}</p>
                      </td>
                      <td>
                        <p>{row.float === "true" ? `✅` : `❌`}</p>
                      </td>
                      <td>
                        <p>{row.comments}</p>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <th scope="row">
                    <input
                      type="date"
                      value={newDentalCare.date}
                      // can make a callback function for onChange with setNewDentalCare: see mernp1 orderindex: handle updates//
                      onChange={(e) => {
                        setNewDentalCare({
                          ...newDentalCare,
                          date: e.target.value,
                        });
                      }}
                      required
                    />
                  </th>
                  <td>
                    <input
                      type="checkbox"
                      checked={newDentalCare.exam === "true"}
                      onChange={(e) => {
                        setNewDentalCare({
                          ...newDentalCare,
                          exam:
                            newDentalCare.exam === "true" ? "false" : "true",
                        });
                      }}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="checkbox"
                      checked={newDentalCare.float === "true"}
                      onChange={(e) => {
                        setNewDentalCare({
                          ...newDentalCare,
                          float:
                            newDentalCare.float === "true" ? "false" : "true",
                        });
                      }}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      value={newDentalCare.comments}
                      onChange={(e) => {
                        setNewDentalCare({
                          ...newDentalCare,
                          comments: e.target.value,
                        });
                      }}
                      required
                    />
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
            <button
              onClick={(e) => handleHorseCare(e, "dentalCare", newDentalCare)}
              disabled={
                newDentalCare.date === "" || newDentalCare.comments === ""
              }
            >
              Save
            </button>
            {/* <button onClick={(e)=>handleHorseCare(e,"dentalCare")}>Save</button> */}
            {/*Need arrow function to pass a second argument, if not -->  */}
            {/* can usse e.target.name, but needs <button name:"dentalCare" fr ex */}
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={2} headerTitle="Hoof Care">
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Trim</th>
                  <th scope="col">Shod</th>
                  <th scope="col">Reset</th>
                  <th scope="col">Comments</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {hoofCare.map((row) => {
                  return (
                    <tr>
                      <th scope="row">
                        <p>{row.date}</p>
                      </th>
                      <td>
                        <p>{row.trim === "true" ? `✅` : `❌`}</p>
                      </td>
                      <td>
                        <p>{row.shod === "true" ? `✅` : `❌`}</p>
                      </td>
                      <td>
                        <p>{row.reset === "true" ? `✅` : `❌`}</p>
                      </td>
                      <td>
                        <p>{row.comments}</p>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <th scope="row">
                    <input
                      type="date"
                      value={newHoofCare.date}
                      onChange={(e) => {
                        setNewHoofCare({
                          ...newHoofCare,
                          date: e.target.value,
                        });
                      }}
                      required
                    />
                  </th>
                  <td>
                    <input
                      type="checkbox"
                      checked={newHoofCare.trim === "true"}
                      onChange={(e) => {
                        setNewHoofCare({
                          ...newHoofCare,
                          trim: newHoofCare.trim === "true" ? "false" : "true",
                        });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={newHoofCare.shod === "true"}
                      onChange={(e) => {
                        setNewHoofCare({
                          ...newHoofCare,
                          shod: newHoofCare.shod === "true" ? "false" : "true",
                        });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={newHoofCare.reset === "true"}
                      onChange={(e) => {
                        setNewHoofCare({
                          ...newHoofCare,
                          reset:
                            newHoofCare.reset === "true" ? "false" : "true",
                        });
                      }}
                    />
                  </td>
                  <td
                    type="text"
                    value={newHoofCare.comments}
                    onChange={(e) =>
                      setNewHoofCare({
                        ...newHoofCare,
                        comments: e.target.value,
                      })
                    }
                  >
                    <textarea />
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
            <button
              onClick={(e) => handleHorseCare(e, "hoofCare", newHoofCare)}
              disabled={newHoofCare.date === "" || newHoofCare.comment === ""}
            >
              Save
            </button>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={3} headerTitle="Parasite Control">
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Product Used</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {parasiteControl.map((row) => {
                  return (
                    <tr>
                      <th scope="row">
                        <p>{row.date}</p>
                      </th>
                      <td>
                        <p>{row.productUsed}</p>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <th scope="row">
                    <input
                      type="date"
                      value={newParasiteControl.date}
                      onChange={(e) => {
                        setNewParasiteControl({
                          ...newParasiteControl,
                          date: e.target.value,
                        });
                      }}
                    />
                  </th>
                  <td>
                    <textarea
                      type="text"
                      value={newParasiteControl.productUsed}
                      onChange={(e) => {
                        setNewParasiteControl({
                          ...newParasiteControl,
                          productUsed: e.target.value,
                        });
                      }}
                      required
                    />
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
            <button
              onClick={(e) =>
                handleHorseCare(e, "parasiteControl", newParasiteControl)
              }
              disabled={
                newParasiteControl.date === "" ||
                newParasiteControl.productUsed === ""
              }
            >
              Save
            </button>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={4} headerTitle="Vaccination History">
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Vaccine</th>
                  <th scope="col">Batch Number</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {vaccinationHistory.map((row) => {
                  return (
                    <tr>
                      <th scope="row">
                        <p>{row.date}</p>
                      </th>
                      <td>
                        <p>{row.vaccine}</p>
                      </td>
                      <td>
                        <p>{row.batchNumber}</p>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <th scope="row">
                    <input
                      type="date"
                      value={newVaccinationHistory.date}
                      onChange={(e) => {
                        setNewVaccinationHistory({
                          ...newVaccinationHistory,
                          date: e.target.value,
                        });
                      }}
                      required
                    />
                  </th>
                  <td>
                    <select
                      value={newVaccinationHistory.vaccine}
                      onChange={(e) => {
                        setNewVaccinationHistory({
                          ...newVaccinationHistory,
                          vaccine: e.target.value,
                        });
                      }}
                    >
                      <option>Influenza</option>
                      <option>Rhinopneumonitis</option>
                      <option>Tetanus</option>
                      <option>Eastern/Western Encephalomyelitis</option>
                      <option>West Nile</option>
                      <option>Strangles</option>
                      <option>Potomoc Horse Fever</option>
                      <option>Rabies</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={newVaccinationHistory.batchNumber}
                      onChange={(e) => {
                        setNewVaccinationHistory({
                          ...newVaccinationHistory,
                          batchNumber: e.target.value,
                        });
                      }}
                      required
                    />
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
            <button
              onClick={(e) =>
                handleHorseCare(e, "vaccinationHistory", newVaccinationHistory)
              }
              disabled={
                newVaccinationHistory.date === "" ||
                newVaccinationHistory.comment === ""
              }
            >
              Save
            </button>
          </MDBAccordionItem>
          <MDBAccordionItem collapseId={5} headerTitle="Diagnostic Testing">
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Condition</th>
                  <th scope="col">Results</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {diagnosticTesting.map((row) => {
                  return (
                    <tr>
                      <th scope="row">
                        <p>{row.date}</p>
                      </th>
                      <td>
                        <p>{row.condition}</p>
                      </td>
                      <td>
                        <p>{row.results}</p>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <th scope="row">
                    <input
                      type="date"
                      value={newDiagnosticTesting.date}
                      onChange={(e) => {
                        setNewDiagnosticTesting({
                          ...newDiagnosticTesting,
                          date: e.target.value,
                        });
                      }}
                      required
                    />
                  </th>
                  <td>
                    <textarea
                      type="text"
                      value={newDiagnosticTesting.condition}
                      onChange={(e) => {
                        setNewDiagnosticTesting({
                          ...newDiagnosticTesting,
                          condition: e.target.value,
                        });
                      }}
                      required
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      value={newDiagnosticTesting.results}
                      onChange={(e) => {
                        setNewDiagnosticTesting({
                          ...newDiagnosticTesting,
                          results: e.target.value,
                        });
                      }}
                      required
                    />
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
            <button
              onClick={(e) =>
                handleHorseCare(e, "diagnosticTesting", newDiagnosticTesting)
              }
              disabled={
                newDiagnosticTesting.date === "" ||
                newDiagnosticTesting.results === ""
              }
            >
              Save
            </button>
          </MDBAccordionItem>
        </MDBAccordion>
        {/* <StyledInnerDiv>
          </StyledInnerDiv> */}
        <button onClick={(e) => handleDeleteHorse(e, id)}>
          Delete This Horse
        </button>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  color: #3b3214;
  background-color: #5a6404;
  background-size: cover;
  min-height: 106vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  margin: auto;
  padding-bottom: 0px;
  margin-bottom: -2%;
`;

export default HorseCare;
