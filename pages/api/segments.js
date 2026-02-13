import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://connect.mailerlite.com/api/segments", {
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
    });

    const data = await response.json();

    res.status(200).json(data.data || []);
  } catch {
    res.status(500).json([]);
  }
}
