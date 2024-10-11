import './App.css';
import './HelpCenter.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import HelpCenter from './pages/HelpCenter';
import PriceCard from './components/PriceCard';

function App() {
  return (
    <Router> {/* Ensure that Router wraps the entire app */}
      <div className="App">
        <Navbar />
        <Routes>
          {/* Use `element` prop instead of `component` */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/help" element={<HelpCenter />} />
        </Routes>
        </div>
        <Footer />
    </Router>
  );
}

export default App;
