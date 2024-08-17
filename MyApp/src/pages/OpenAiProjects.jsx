import React, { useState } from "react";

const OpenAiProject = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const API_KEY = "LA_TUA_API_KEY_OPENAI"; // Inserisci qui la tua chiave API OpenAI

    const data = {
      model: "gpt-3.5-turbo", // Oppure il modello che stai utilizzando
      messages: [{ role: "user", content: inputText }],
      max_tokens: 150,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      setResponse(result.choices[0].message.content);
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
      setResponse("Errore durante la richiesta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>ChatGPT React Component</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Scrivi una richiesta..."
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Attendere..." : "Invia"}
      </button>
      <div>
        <h2>Risposta:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default OpenAiProject;
