import {Footer,SearchBar} from './Components';
import {Outlet} from 'react-router-dom'

function App() {
  

  return (
    <>
    {/* <Navbar/> */}
    <SearchBar/>
    <Outlet/>
    <Footer/>

    </>
  )
}

export default App
