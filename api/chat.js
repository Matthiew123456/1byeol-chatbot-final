import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message manquant dans la requête.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Clé API OpenAI manquante dans Vercel." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "Tu es Léa, experte skincare de la marque Byeol. Tu réponds avec clarté, bienveillance et professionnalisme aux questions des clients sur les patchs anti-boutons, la livraison et les retours.",
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const response = completion.data.choices[0].message.content;
    res.status(200).json({ response });

  } catch (error) {
    console.error('❌ Erreur OpenAI :', JSON.stringify(error, null, 2)); // 🔍 log complet
    return res.status(500).json({
      error: error?.response?.data || error?.message || 'Erreur lors de l’appel OpenAI',
    });
  }
}
