import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../Components';

function News() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fullContent, setFullContent] = useState("");
  const { title, author, urlToImage, publishedAt, description, video, url } = state || {};

  //Function for web scraping full article content
  
  useEffect(() => {
    async function handleReadMore(newsUrl) {
      if (!newsUrl) return setLoading(false);
      try {
        const response = await fetch(`https://global-news-backend.vercel.app/api?url=${encodeURIComponent(newsUrl)}`);
        const article = await response.json();
        setFullContent(article.content);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    }

    handleReadMore(url);
  }, [url]);
// async function fetchWithRetry(url, retries = 3) {
//   for (let i = 0; i < retries; i++) {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("HTTP Error " + res.status);
//       return await res.json();
//     } catch (err) {
//       console.warn(`Attempt ${i + 1} failed:`, err.message);
//       await new Promise(r => setTimeout(r, 1500));
//     }
//   }
//   throw new Error("All retries failed");
// }

//   useEffect(() => {
//   async function handleReadMore(newsUrl) {
//     if (!newsUrl) return setLoading(false);

//     try {
//       const article = await fetchWithRetry(
//         `https://global-news-backend.vercel.app/app?url=${encodeURIComponent(newsUrl)}`
//       );
//       setFullContent(article.content);
//     } catch (err) {
//       console.error("Error fetching article:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   handleReadMore(url);
// }, [url]);

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-lg text-red-500 font-semibold">No news selected!</p>
        <button 
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    );
  }

  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col px-4 py-6 md:py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl text-gray-900 p-6 md:p-10 flex flex-col gap-6">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center">{title}</h1>

        {/* Image */}
        {urlToImage ? (
          <img src={urlToImage} alt={title} className="w-full max-h-96 object-cover rounded-xl shadow-md" />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-xl">
            <p className="text-gray-500">No image available</p>
          </div>
        )}

        {/* Video */}
        {video && (
          <video src={video} controls className="w-full rounded-lg mt-4 shadow-md" />
        )}

        {/* Content */}
        <p className="text-gray-700 text-justify leading-relaxed text-md md:text-lg">
          {fullContent || description || "No content available."}
        </p>

        {/* Meta Info */}
        <div className="flex flex-col md:flex-row justify-between text-sm md:text-base text-gray-600 mt-4 gap-2 md:gap-6">
          <span><strong>Published on:</strong> {publishedAt ? new Date(publishedAt).toLocaleString() : "Unknown"}</span>
          {author && <span><strong>By:</strong> {author}</span>}
        </div>

        {/* Back Button */}
        <div className="flex justify-start mt-6">
          <button 
            className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default News;
