import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*", credentials: true }));






app.get("/app", async (req, res) => {
  const articleUrl = req.query.url;
  if (!articleUrl) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); 
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
    clearTimeout(timeout);
    const $ = cheerio.load(html);

    const title = $("h1").first().text();
    const paragraphs = $("p").map((i, el) => $(el).text()).get().join(" ");
    const cleaned = paragraphs.replace(/\s+/g, " ").trim();

    res.json({ title, content: cleaned.slice(0, 5000) });
  } catch (error) {
    console.error("Error fetching article:", error.message);
    res.status(500).json({ error: "Failed to extract content" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
