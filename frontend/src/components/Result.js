import React from "react";


function Result({ prediction, model }) {
  const isDiabetes = prediction === 1;

  return (
    <div className="result-card">
      <h2 className={isDiabetes ? "result-diabetes" : "result-nondiabetes"}>
        {isDiabetes ? " Prediction: Diabetes" : " Prediction: No Diabetes"}
      </h2>
      <p className="model-info">
        Model used:{" "}
        <span className="model-badge">
          {model === "log_reg" ? "Logistic Regression" : "Decision Tree"}
        </span>
      </p>
    </div>
  );
}

export default Result;