// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type NewsItem = [string, string, string]; // [title, link, img]
type Data = NewsItem[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const API_URL = process.env.BACKEND_API_URL;
    const response = await fetch(`${API_URL}/news`); // calls Python API
    if (!response.ok) throw new Error("Failed to fetch news");

    const data: Data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json([]);
  }
}
