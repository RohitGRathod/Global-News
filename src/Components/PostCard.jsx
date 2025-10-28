import { useState } from 'react';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';


function PostCard({ newsItems }) {
  const navigate = useNavigate();
  const [newsItem] = useState(newsItems);
  const description = newsItem.description || "Description not available";
  const handleOnClick = () => {
    navigate('/news', { state: { ...newsItem } });
  }

  return (
    <div
      onClick={handleOnClick}
      className="p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer flex flex-col"
    >
      {/* Image of the news*/}
      {newsItem && (
        <img
          src={newsItem.urlToImage}
          alt={newsItem.title}
          className="w-full h-48 object-cover rounded-md mb-3 transition-transform duration-300 hover:scale-105"
        />
      )}
      {/* source name and published date */}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
        <span>{newsItem.source?.name}</span>
        <span>{newsItem.publishedAt ? new Date(newsItem.publishedAt).toLocaleDateString() : ""}</span>
      </div>
      {/* title */}
      <h2 className="font-bold text-xl mb-2 line-clamp-2 text-gray-900">
        {parse(String(newsItem.title || ""))}
      </h2>
      {/* Description of the image */}
      <p className="text-gray-600 text-base line-clamp-3 overflow-hidden min-h-[4.5rem]">
        {parse(String(description))}
      </p>
      {newsItem.description && (
        <span className="text-blue-500 text-sm mt-1">Read more →</span>
      )}
    </div>
  );
}

export default PostCard;
