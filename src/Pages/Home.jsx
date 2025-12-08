import { useEffect, useState, useContext } from 'react';
import { PostCard, Loader, SkeletonCard } from '../Components/index.js';
import { SearchContext } from '../Components/SearchContext.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import config from '../config/config';

// Country → domain mapping (for better accuracy)
//We will use these news domains to access the news of that specific country
const domainsByCountry = {
  in: 'timesofindia.com,indiatimes.com,indiatoday.in,hindustantimes.com,ndtv.com',
  gb: 'bbc.co.uk,guardian.co.uk',
  au: 'abc.net.au,smh.com.au,theaustralian.com.au',
  ca: 'cbc.ca,thestar.com',
  ar: 'batimes.com.ar,buenosairesherald.com,english.elpais.com',
  at: 'vienna.at,thelocal.at,english.orf.at',
  be: 'thebulletin.be,brusselstimes.com,thelocal.be',
  br: 'brasil247.com,campogrenadebate.com.br,oglobo.globo.com',
  bg: 'sofiaglobe.com,novinite.com,thebulletin.bg',
  cn: 'chinadigitaltimes.net',
  co: 'thebogotapost.com,colombiareports.com,thecitypaperbogota.com',
  cu: 'cubanet.org,cubadebate.cu,reuters.com/places/cuba',
  cz: 'praguepost.com,praguemonitor.com,expats.cz/news',
  eg: 'egyptindependent.com,dailynewsegypt.com,ahram.org.eg',
  fr: 'thelocal.fr,france24.com/en,lemonde.fr/en',
  de: 'thelocal.de,dw.com/en,berlin.de/en/news',
  gr: 'ekathimerini.com,greece.greekreporter.com,athensnews.gr',
  hk: 'scmp.com,hongkongfp.com,rthk.hk/news',
  hu: 'budapesttimes.hu,hungarytoday.hu,thehungariantimes.com',
  id: 'jakartapost.com,thejakartaglobe.com,tempo.co/english',
  ie: 'irishtimes.com,independent.ie,rte.ie/news',
  il: 'timesofisrael.com,jpost.com,haaretz.com',
  it: 'thelocal.it,ansa.it/english,reuters.com/places/italy',
  jp: 'japantimes.co.jp,nhk.or.jp/nhkworld/en,japantoday.com',
  lv: 'eng.lsm.lv,baltictimes.com,latviansonline.com',
  lt: 'lithuaniatribune.com,delfi.lt/en,lt24.lt/en',
  my: 'thestar.com.my,malaysiakini.com,nst.com.my',
  mx: 'mexiconewsdaily.com,theyucatannews.com,mexiconewsnetwork.com',
  ma: 'moroccoworldnews.com,lematin.ma/en,africanews.com/tag/morocco',
  nl: 'nltimes.nl,thehagueinternational.com,dutchnews.nl',
  nz: 'nzherald.co.nz,stuff.co.nz,rnz.co.nz/news',
  ng: 'thenationonlineng.net,guardian.ng,vanguardngr.com',
  no: 'thelocal.no,norwaytoday.info,nordicbusinessreport.com',
  ph: 'inquirer.net,manilastandard.net,philstar.com',
  pl: 'thenews.pl,polandin.com,thefirstnews.com',
  pt: 'portugalresident.com,theportugalnews.com,expatica.com/pt/news',
  ro: 'romania-insider.com,activenews.ro,romaniatv.net',
  sa: 'arabnews.com,saudigazette.com.sa,arabianbusiness.com',
  rs: 'balkaneu.com,serbianmonitor.com,serbiatimes.info',
  sg: 'straitstimes.com,todayonline.com,channelnewsasia.com/news/singapore',
  sk: 'spectator.sme.sk,newsnow.sk,slovakradio.sk',
  si: 'slovenianobserver.com,slovenia-news.com,rtvslo.si/news',
  za: 'news24.com,iol.co.za,timeslive.co.za',
  kr: 'koreaherald.com,koreatimes.co.kr,yonhapnews.co.kr',
  se: 'thelocal.se,sweden.se/news,sverigesradio.se/english',
  ch: 'swissinfo.ch/eng,swissreview.com,swissdailynews.ch',
  tw: 'taipeitimes.com,taiwannews.com.tw,focus.taiwan.tw',
  th: 'bangkokpost.com,thestandard.co,thaipbsworld.com',
  tr: 'hurriyetdailynews.com,ahvalnews.com,dailysabah.com',
  ae: 'gulfnews.com,thenationalnews.com,khaleejtimes.com',
  ua: 'kyivpost.com,ukrainealert.com,euromaidanpress.com',
  us: 'nytimes.com,cnn.com,washingtonpost.com,foxnews.com',
  ve: 'thedailyvenezuelan.com,venezuelanalysis.com,eluniversal.com/english',
};

// Country code → full name
// const countryNames = {
//   ar: "Argentina",
//   au: "Australia",//-->
//   at: "Austria",
//   be: "Belgium",
//   br: "Brazil",
//   bg: "Bulgaria",
//   ca: "Canada",
//   cn: "China",
//   co: "Colombia",
//   cu: "Cuba",
//   cz: "Czech Republic",
//   eg: "Egypt",
//   fr: "France",
//   de: "Germany",
//   gr: "Greece",
//   hk: "Hong Kong",
//   hu: "Hungary",
//   in: "India",//->
//   id: "Indonesia",
//   ie: "Ireland",//-->
//   il: "Israel",//-->
//   it: "Italy",
//   jp: "Japan",//-->
//   lv: "Latvia",
//   lt: "Lithuania",
//   my: "Malaysia",//-->
//   mx: "Mexico",
//   ma: "Morocco",
//   nl: "Netherlands",
//   nz: "New Zealand",//-->
//   ng: "Nigeria",
//   no: "Norway",
//   ph: "Philippines",
//   pl: "Poland",
//   pt: "Portugal",
//   ro: "Romania",
//   sa: "Saudi Arabia",
//   rs: "Serbia",
//   sg: "Singapore",//-->
//   sk: "Slovakia",
//   si: "Slovenia",
//   za: "South Africa",//-->
//   kr: "South Korea",
//   se: "Sweden",
//   ch: "Switzerland",
//   tw: "Taiwan",
//   th: "Thailand",
//   tr: "Turkey",
//   ae: "United Arab Emirates",
//   ua: "Ukraine",
//   gb: "United Kingdom",//-->
//   us: "United States",//-->
//   ve: "Venezuela",
// };
const countryNames = {
  au: "Australia",
  cn: "China",
  de: "Germany",
  in: "India",
  ie: "Ireland",
  il: "Israel",
  jp: "Japan",
  my: "Malaysia",
  nz: "New Zealand",
  sg: "Singapore",
  za: "South Africa",
  tr: "Turkey",
  gb: "United Kingdom",
  us: "United States",


}

function Home() {
  const { category, country, keyword } = useContext(SearchContext);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const backendUrl = "https://global-news-backend.vercel.app/api/news";
  




  //api fetching
  const fetchNews = async (isLoadMore = false) => {
    if (isLoadMore) setFetchingMore(true);
    else setLoading(true);


    try {
      const url = `${backendUrl}?country=${country}&category=${category}&keyword=${keyword}&page=${page}`;
      const res = await fetch(url);

      const data = await res.json();

      if (data?.articles) {
        setNewsData(prev =>
          isLoadMore ? [...prev, ...data.articles] : data.articles
        );
        setTotalResults(data.totalResults || 0);
      } else {
        setNewsData([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      if (!isLoadMore) setNewsData([]);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }


  }

  // Re-fetch when category, country, or keyword changes
  useEffect(() => {
    setPage(1);
    fetchNews(false);
  }, [category, country, keyword]);

  // Load more handler
  const loadMore = () => setPage(prev => prev + 1);

  // Fetch when page changes (load more)
  useEffect(() => {
    if (page > 1) fetchNews(true);
  }, [page]);

  return (
    //Infinte scroll for scrolling the news
    <InfiniteScroll
      dataLength={newsData.length}
      next={loadMore}
      hasMore={newsData.length < totalResults}
      loader={loading && fetchingMore && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center w-11/12 mx-auto rounded-2xl bg-gray-100 p-6 shadow-2xl mt-36">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>}
      endMessage={<p className="text-center text-gray-500 my-4">✅ You’ve reached the end.</p>}
    >
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center w-11/12 mx-auto rounded-2xl bg-gray-100 p-6 shadow-2xl mt-36">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col mt-8 rounded-2xl">
          <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-100 rounded-2xl shadow-2xl text-gray-900 p-6">

            {/* Section Heading */}
            <div className="col-span-full text-center font-bold text-xl mb-6 text-gray-800">
              {loading ? (
                <Skeleton
                  width={280}
                  height={28}
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                  borderRadius="0.5rem"
                />
              ) : (
                <h1>
                  📰 Top {category} News in {countryNames[country] || country.toUpperCase()}
                </h1>
              )}
            </div>

            {/* News Cards */}
            {newsData.length > 0 ? (
              newsData.map((newsItem, idx) => (
                <PostCard key={newsItem.url || idx} newsItems={newsItem} />
              ))
            ) : (
              <p className="text-center text-red-500 col-span-full">
                No articles found for “{keyword || category}” in {countryNames[country] || country.toUpperCase()}.
              </p>
            )}

            {/*Loader for new fetches */}
            {fetchingMore && (
              <div className="col-span-full flex justify-center my-4">
                <Loader />
              </div>
            )}
          </div>
        </div>
      )}
    </InfiniteScroll>
  );
}

export default Home;
