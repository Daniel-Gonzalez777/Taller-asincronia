const GEMINI_API_KEY = "AIzaSyCqRRtLSaWmA1Ad-T6x-feOgPX_uBvhZyU";
const COHERE_API_KEY = "q6V8qrwsWnNqfFytGxXHXMxejxgPUv6se0E3TVLx";

async function sendToAIs() {
  const input = document.getElementById("inputText").value;
  const loader = document.getElementById("loader");
  const responseGemini = document.getElementById("responseGemini");
  const responseCohere = document.getElementById("responseCohere");

  if (!input.trim()) {
    responseGemini.textContent = "Por favor, ingresa un texto.";
    responseCohere.textContent = "Por favor, ingresa un texto.";
    return;
  }

  loader.style.display = "block";
  responseGemini.textContent = "";
  responseCohere.textContent = "";

  const geminiFetch = fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: input }] }]
      })
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.warn("Gemini response:", data);
        return "No se obtuvo respuesta válida de Gemini.";
      }
    })
    .catch((err) => {
      console.error("Error con Gemini:", err);
      return "Error al conectar con Gemini.";
    });

  const cohereFetch = fetch("https://api.cohere.ai/v1/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${COHERE_API_KEY}`
  },
  body: JSON.stringify({
    model: "command-r-plus",
    message: input,
    temperature: 0.7
  })
})
  .then((res) => res.json())
  .then((data) => {
    if (data.text) {
      return data.text;
    } else {
      console.warn("Cohere response:", data);
      return "No se obtuvo respuesta válida de Cohere.";
    }
  })
  .catch((err) => {
    console.error("Error con Cohere:", err);
    return "Error al conectar con Cohere.";
  });

  const [geminiResponse, cohereResponse] = await Promise.all([geminiFetch, cohereFetch]);

  loader.style.display = "none";
  responseGemini.textContent = geminiResponse;
  responseCohere.textContent = cohereResponse;
}
