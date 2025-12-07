import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  export default async function handler(req, res) {
  // CORS FIX
  res.setHeader("Access-Control-Allow-Origin", "https://global-news-nine.vercel.app");  
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ---- your code below ----

  const articleUrl = req.query.url;

  if (!articleUrl) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const response = await fetch(articleUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $("h1").first().text();
    const paragraphs = $("p")
      .map((i, el) => $(el).text())
      .get()
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return res.status(200).json({
      title,
      content: paragraphs.slice(0, 5000),
    });
  } catch (error) {
    console.error("Error fetching article:", error.message);
    return res.status(500).json({ error: "Failed to extract content" });
  }
}
