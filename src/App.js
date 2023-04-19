import './App.css';
import Navbar from './components/Navbar';
import Booking from './components/Booking';
import {Route, Routes} from 'react-router-dom';
import TripDetails from './components/TripDetails';
import MapComponent from './components/MapsComponent';

function App() {
  return (
    <>
    <Navbar title = "nammayatri"/>
    <Routes>
      <Route path = "/" element = {<Booking/>}/>
      <Route path = "/tripDetails" element = {<TripDetails/>}/>
      <Route path = "/MapComponent" element = {<MapComponent/>}/>
    </Routes>
    </>
  );
}

export default App;
