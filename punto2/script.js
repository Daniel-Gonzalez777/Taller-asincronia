async function sendToAll() {
    const text = document.getElementById('inputText').value.trim();
    const loader = document.getElementById('loader');
    const geminiCard = document.getElementById('geminiResponse');
    const cohereCard = document.getElementById('cohereResponse');
    const togetherCard = document.getElementById('openRouterResponse'); // reutilizamos el mismo div

    if (!text) {
        geminiCard.textContent = "Por favor, escribe una pregunta.";
        cohereCard.textContent = "";
        togetherCard.textContent = "";
        return;
    }

    geminiCard.textContent = "";
    cohereCard.textContent = "";
    togetherCard.textContent = "";
    loader.style.display = 'block';

    const geminiApiKey = "AIzaSyCqRRtLSaWmA1Ad-T6x-feOgPX_uBvhZyU";
    const cohereApiKey = "GYjWbhXQfwTM5bXiwsDxTwNM2BAJSGIcY0XnlyNi";
    const togetherApiKey = "5ff5cfca0b3574246c8c87373395718ac1ea79b1f1ff7002fd237b7eabf8190d";

    try {
        const [geminiResult, cohereResult, togetherResult] = await Promise.all([
            callGemini(text, geminiApiKey),
            callCohere(text, cohereApiKey),
            callTogether(text, togetherApiKey)
        ]);

        geminiCard.textContent = geminiResult;
        cohereCard.textContent = cohereResult;
        togetherCard.textContent = togetherResult;
    } catch (error) {
        geminiCard.textContent = "Error en la consulta.";
        cohereCard.textContent = "Error en la consulta.";
        togetherCard.textContent = "Error en la consulta.";
        console.error(error);
    } finally {
        loader.style.display = 'none';
    }
}

async function callGemini(text, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const body = {
        contents: [{ parts: [{ text }] }]
    };
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta válida de Gemini.";
    } catch {
        return "Error al conectar con Gemini.";
    }
}

async function callCohere(text, apiKey) {
    const url = "https://api.cohere.ai/v1/chat";
    const body = {
        model: "command-r",
        message: text,
        chat_history: [],
        temperature: 0.3
    };
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.reply) return data.reply;
        if (data.text) return data.text;
        if (Array.isArray(data.generations) && data.generations[0]?.text) return data.generations[0].text;
        return "Respuesta sin texto útil de Cohere.";
    } catch {
        return "Error al conectar con Cohere.";
    }
}

async function callTogether(text, apiKey) {
    const url = "https://api.together.xyz/v1/chat/completions";
    const body = {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [{ role: "user", content: text }],
        temperature: 0.7
    };
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return data?.choices?.[0]?.message?.content || "Sin respuesta válida de Together.";
    } catch (err) {
        console.error("Error en Together:", err);
        return "Error al conectar con Together.";
    }
}

window.sendToAll = sendToAll;

async function callGemini(text, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const body = {
        contents: [{ parts: [{ text }] }]
    };
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta válida de Gemini.";
    } catch {
        return "Error al conectar con Gemini.";
    }
}

async function callCohere(text, apiKey) {
    const url = "https://api.cohere.ai/v1/chat";
    const body = {
        model: "command-r",
        message: text,
        chat_history: [],
        temperature: 0.3
    };
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.reply) return data.reply;
        if (data.text) return data.text;
        if (Array.isArray(data.generations) && data.generations[0]?.text) return data.generations[0].text;
        return "Respuesta sin texto útil de Cohere.";
    } catch {
        return "Error al conectar con Cohere.";
    }
}

async function callTogether(text, apiKey) {
    const url = "https://api.together.xyz/v1/chat/completions";
    const body = {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [{ role: "user", content: text }],
        temperature: 0.7
    };
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return data?.choices?.[0]?.message?.content || "Sin respuesta válida de Together.";
    } catch (err) {
        console.error("Error en Together:", err);
        return "Error al conectar con Together.";
    }
}

window.sendToAll = sendToAll;