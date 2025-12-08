import React, { useContext } from 'react';
import { SearchContext } from '../SearchContext.jsx';
import { Search, Globe, ListFilter } from 'lucide-react'; // modern icons

function SearchBar() {
  const { category, setCategory, keyword, setKeyword, country, setCountry, handleSearch } =
    useContext(SearchContext);


  //News categories and countries for dropdowns
  const categories = [
    'General',
    'Sports',
    'Business',
    'Technology',
    'Entertainment',
    'Health',
    'Science',
  ];

  // const countries = {
  //   ar: 'Argentina',
  //   au: 'Australia',
  //   at: 'Austria',
  //   be: 'Belgium',
  //   br: 'Brazil',
  //   bg: 'Bulgaria',
  //   ca: 'Canada',
  //   cn: 'China',
  //   co: 'Colombia',
  //   cu: 'Cuba',
  //   cz: 'Czech Republic',
  //   eg: 'Egypt',
  //   fr: 'France',
  //   de: 'Germany',
  //   gr: 'Greece',
  //   hk: 'Hong Kong',
  //   hu: 'Hungary',
  //   in: 'India',
  //   id: 'Indonesia',
  //   ie: 'Ireland',
  //   il: 'Israel',
  //   it: 'Italy',
  //   jp: 'Japan',
  //   lv: 'Latvia',
  //   lt: 'Lithuania',
  //   my: 'Malaysia',
  //   mx: 'Mexico',
  //   ma: 'Morocco',
  //   nl: 'Netherlands',
  //   nz: 'New Zealand',
  //   ng: 'Nigeria',
  //   no: 'Norway',
  //   ph: 'Philippines',
  //   pl: 'Poland',
  //   pt: 'Portugal',
  //   ro: 'Romania',
  //   sa: 'Saudi Arabia',
  //   rs: 'Serbia',
  //   sg: 'Singapore',
  //   sk: 'Slovakia',
  //   si: 'Slovenia',
  //   za: 'South Africa',
  //   kr: 'South Korea',
  //   se: 'Sweden',
  //   ch: 'Switzerland',
  //   tw: 'Taiwan',
  //   th: 'Thailand',
  //   tr: 'Turkey',
  //   ae: 'United Arab Emirates',
  //   ua: 'Ukraine',
  //   gb: 'United Kingdom',
  //   us: 'United States',
  //   ve: 'Venezuela',
  // };
  //These are the supported countries in the free News API plan that we are going to use 
  const countries = {
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
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl shadow-md sticky top-0 z-50 w-full">
      {/* Brand / Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
        Global<span className="text-gray-800">News</span>
      </h1>

      {/* Filters (category + country) */}
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-gray-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 transition cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-500" />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 transition"
          >
            {Object.entries(countries).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search news..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 shadow-sm text-sm sm:text-base"
        />
      </div>
    </div>
  );
}

export default SearchBar;
