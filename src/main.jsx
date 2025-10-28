import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Home, News } from './Components'
import { SearchProvider } from './Components/SearchContext.jsx'
const route = createBrowserRouter((
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<Home />} />
      <Route path='/news' element={<News />} />
    </Route>
  )
))
createRoot(document.getElementById('root')).render(
  <SearchProvider>

    <StrictMode>
      <RouterProvider router={route} />
    </StrictMode>,
  </SearchProvider>
)
