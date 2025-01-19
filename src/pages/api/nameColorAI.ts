import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ name: 'Method not allowed' });
  }

  try {
    //req.body {"r":223,"g":124,"b":124}
    const { r, g, b } = JSON.parse(req.body);

    // Validate RGB values
    if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' ||
        r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      return res.status(400).json({ name: 'Invalid RGB values' });
    }

    // Call OpenAI API to generate color name
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant that creates names for colors that bring peace to the world." },
            {
                role: "user",
                content: `Create a name for a color related with PEACE, call to peace in the world or is something very calm that is related to peace with RGB values: R:${r}, G:${g}, B:${b} and maxium 40 characters. Respond with just the name, no explanattion.`,
            },
        ],
    });

    res.status(200).json({ name: completion.choices[0].message.content || ""});
  } catch (error) {
    console.error('Error:', error);
    
    res.status(500).json({ name: 'Error generating color name' });
  }
}
