import axios from "axios";
import React, { useState } from "react";
import "./PredictDoc.css";
export default function PredictDoc() {
  const [options, setOptions] = useState([
    "Select your symptom",
    "itching",
    "skin_rash",
    "red_sore_around_nose",
    "muscle_weakness",
    "weakness_in_limbs",
    "chest_pain",
    "sweating",
    "depression",
    "bruising",
    "dizziness",
    "anxiety",
    "musclepain",
    "neck_pain",
    "back_pain",
    "cramps",
    "puffy_face_and_eyes",
    'fast_heart_rate',
    'headache'
  ]);
  //   symptoms =
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [symptoms, setSymptoms] = useState([]);
  const [predicedtype, setPredictedtype] = useState(false);
  const [valuesymp, setValuesymp] = useState("Select your symptom");
  function formatSymptom(symptom) {
    return symptom
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  console.log(symptoms);
  const handleChange = (e) => {
    if (e.target.value === "Select your symptom") return;
    console.log(e.target.value);
    setValuesymp(e.target.value);
    setSymptoms((st) => {
      return [...st, e.target.value];
    });
    setOptions((opt) => {
      return opt.filter((val) => val !== valuesymp);
    });
    if (predicedtype !== "") setPredictedtype(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${backendUrl}/prediction`, { issues: symptoms })
      .then((result) => {
        console.log(result.data);
        setPredictedtype(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="heading"> Select your Symptoms</h1>
      <div className="container1">
        <div className="box-rounded">
          <form className="form" onSubmit={handleSubmit}>
            <div className="my-2 select-container">
              <select
                className="select-box"
                name="symptoms"
                id=""
                onChange={handleChange}
                value={valuesymp}
              >
                {options.map((opt) => {
                  return (
                    <option key={opt} value={opt}>
                      {formatSymptom(opt)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="my-2">
              <h3 className="sub-heading"> Selected Symptoms </h3>
              <div className="symptoms-container ">
                {symptoms.map((st) => {
                  return (
                    <span key={st} className="badge text-bg-primary p-2 me-2">
                      {formatSymptom(st)}
                    </span>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: "0.7rem" }}
            >
              Submit
            </button>
          </form>

          {predicedtype !== false && (
            <div className="my-2 bg-primary text-light text-center rounded p-3">
              {predicedtype}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
