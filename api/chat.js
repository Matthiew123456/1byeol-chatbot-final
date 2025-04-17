export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  console.log("🔍 Clé API détectée :", apiKey ? apiKey.slice(0, 10) + "..." : "❌ Aucune");

  if (!apiKey) {
    return res.status(500).json({
      error: "❌ Clé API OpenAI manquante dans Vercel. Ajoute-la dans Environment Variables."
    });
  }

  return res.status(200).json({
    message: "✅ Clé API bien reçue par le backend.",
    keyPreview: apiKey.slice(0, 10) + "..."
  });
}
