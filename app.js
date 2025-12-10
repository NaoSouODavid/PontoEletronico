const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const anthropic = new Anthropic({
  apiKey: "SUA_CHAVE_AQUI",
});

app.post("/api/verificar-ponto", async (req, res) => {
  try {
    const { imagem, nomeUsuario } = req.body;

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Sua lógica de comparação aqui..." }],
    });

    res.json(msg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
