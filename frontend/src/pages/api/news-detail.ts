import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid URL" });
  }

  try {
    console.log("Fetching news details from FastAPI with URL:", url);
    const API_URL = process.env.BACKEND_API_URL;
    const response = await fetch(`${API_BASE_URL}/news-detail?url=${encodeURIComponent(url)}`);

    
    if (!response.ok) {
      throw new Error(`FastAPI responded with ${response.status}`);
    }

    const data = await response.json();
    // console.log("Received from FastAPI:", data);

    res.status(200).json({detail: data});
  } catch (error) {
    console.error("Error fetching news details:", error);
    res.status(500).json({ error: "Failed to fetch news details", details: error instanceof Error ? error.message : "Unknown error" });
  }
}
