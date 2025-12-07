// /api/news.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "https://global-news-nine.vercel.app");  
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  const { country, category, keyword, page } = req.query;

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key missing in backend" });
  }

  try {
    let url;

    if (country === "us") {
      url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&apiKey=${apiKey}`;

      if (category) url += `&category=${category.toLowerCase()}`;
      if (keyword) url += `&q=${encodeURIComponent(keyword)}`;
    } else {
      const query = keyword || category || "news";
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&page=${page}&language=en&apiKey=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Backend error:", error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
