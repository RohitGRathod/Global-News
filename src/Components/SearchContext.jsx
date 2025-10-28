import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [category, setCategory] = useState('General');
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('us');

  const handleSearch = () => {
    // This can be empty for now; actual fetching will be done in each page
    console.log('Searching:', { category, keyword, country });
  };

  return (
    <SearchContext.Provider
      value={{ category, setCategory, keyword, setKeyword, country, setCountry, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
