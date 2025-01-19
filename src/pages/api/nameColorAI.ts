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
    const { color, colorNames } = JSON.parse(req.body);
    const {red, green, blue} = color;
    // Validate RGB values
    if (typeof red !== 'number' || typeof green !== 'number' || typeof blue !== 'number' ||
        red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
      return res.status(400).json({ name: 'Invalid RGB values' });
    }

    // Call OpenAI API to generate color name
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a poet with a broad language that creates names for colors that bring peace to the world." },
            {
                role: "user",
                content: `Create a name for a color related with PEACE, call to peace in the world or is something very calm that is related to peace with RGB values: R:${red}, G:${green}, B:${blue} and maxium 40 characters. Please don't repeat similar names to the list of colors: ${colorNames}. Not to use common worlds like serenity, Tranquil, harmony, calm, etc. Respond with just the name, no explanattion.`,
            },
        ],
    });

    res.status(200).json({ name: completion.choices[0].message.content || ""});
  } catch (error) {
    console.error('Error:', error);
    
    res.status(500).json({ name: 'Error generating color name' });
  }
}
