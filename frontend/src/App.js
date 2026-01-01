import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Result from "./components/Result";
import "./App.css";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [selectedModel, setSelectedModel] = useState(""); // track which model was used

  const handlePredict = async (formData, model) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
const response = await fetch(`${API_URL}/predict?model=${model}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const result = await response.json();
      setPrediction(result.prediction);
      setSelectedModel(model); // save model choice
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction(null);
    }
  };

  return (
    <div className="App">
      <h1>Diabetes Prediction App</h1>
      <InputForm onPredict={handlePredict} />
      {prediction !== null && (
        <Result prediction={prediction} model={selectedModel} />
      )}
    </div>
  );
}

export default App;