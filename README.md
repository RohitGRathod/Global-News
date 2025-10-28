# 🌍 Global News Aggregator

A **country-based news aggregator** built using the [NewsAPI.org](https://newsapi.org) service.  
This project fetches **real-time English news** by **country** and **category** (business, technology, sports, etc.) using verified news domains for reliability and consistency.

---

## 🚀 Features

- 🌐 **Supports 14 major countries** with verified English news sources  
- 📰 Fetches live headlines across all major categories  
- ⚙️ Intelligent fallback structure for unavailable data  
- 🧠 Built for performance, caching, and easy scalability  
- 💬 Clean domain-based filtering for trusted media outlets  

---

## 🌎 Supported Countries

| Code | Country |
|------|----------|
|au | Australia|
|cn | China|
|de | Germany|
|in | India|
|ie | Ireland|
|il | Israel|
|jp | Japan|
|my | Malaysia|
|nz | New Zealand|
|sg | Singapore|
|za | South Africa|
|tr | Turkey|
|gb | United Kingdom|
|us | United States|

---

## 🗃️ Categories Supported

`general`, `business`, `technology`, `sports`, `entertainment`, `science`, `health`, `politics`

---

## ⚙️ Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/RohitGRathod/Global-News.git
2. **Install Dependencies**
    npm install
3. **Create a .env file in root directory**
    VITE_NEWS_API_KEY= "b1df8e94cb7042cfb69ba642580a36bf"
4. **Run locally**
    npm run dev
    node index.js <!--for running backend service -->

**File Structure**
    ├── src/
│    ├── Components/
│    │    └── Footer/
|    |    |    └── Footer.jsx           #Footer of the page
|    |    └── SearchBar/
|    |    |    └── SearchBar.jsx        #SearchBar for categories and searching the news
|    |    └── SkeletonCard/
|    |    |   └── SkeletonCard.jsx      #For Skeleton loading of webpage
|    |    └── Loader.jsx                #Loader of webpage
|    |    └── PostCard.jsx              #News Postcard
|    |    └── SearchContext.js          #context of category and country
|    |    └── index.js
|    |
|    |       
│    ├── config/
│    │   └── config.js        # Imports the api key from .env
│    ├── Pages/
│    │   └── Home.jsx            # Main news feed page
|        └── News.jsx            #Detailed view of news
│    ├── App.jsx
│    └── main.jsx
├── .env
├── package.json
└── README.md
