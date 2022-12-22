import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={
            <>
              <Banner />
              <Movies />
            </>
          }
          />
          <Route path='/Favourite' element={<Favourite />}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
