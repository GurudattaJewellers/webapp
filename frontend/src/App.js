import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import PriceCard from './components/PriceCard';

function App() {
  return (
    <Router> {/* Ensure that Router wraps the entire app */}
      <div className="App">
        <Navbar />
        <Footer />
      
        <Routes>
          {/* Use `element` prop instead of `component` */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
