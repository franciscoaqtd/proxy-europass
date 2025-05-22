const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", async (req, res) => {
  const { country = "ES", limit = 10 } = req.query;
  const url = `https://europa.eu/europass/learning-opportunities-api/api/v1/opportunities?country=${country}&limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
      }
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al acceder a Europass" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy activo en puerto ${port}`));