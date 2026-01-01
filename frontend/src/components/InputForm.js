import React, { useState } from "react";

function InputForm({ onPredict }) {
  const [formData, setFormData] = useState(Array(8).fill(""));
  const [model, setModel] = useState("log_reg"); // default model

  const labels = [
    "Pregnancies", "Glucose", "Blood Pressure", "Skin Thickness",
    "Insulin", "BMI", "Diabetes Pedigree Function", "Age"
  ];

  const handleChange = (index, value) => {
    const newData = [...formData];
    newData[index] = value;
    setFormData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData.map(Number), model); // pass model choice
  };

  return (
    <form onSubmit={handleSubmit}>
      {labels.map((label, i) => (
        <div key={i}>
          <label>{label}: </label>
          <input
            type="number"
            step="any"
            value={formData[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            required
          />
        </div>
      ))}

      <div>
        <label>Model: </label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="log_reg">Logistic Regression</option>
          <option value="dtree">Decision Tree</option>
        </select>
      </div>

      <button type="submit">Predict</button>
    </form>
  );
}

export default InputForm;