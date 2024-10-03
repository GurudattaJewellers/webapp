import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router> {/* Ensure that Router wraps the entire app */}
      <div className="App">
        <Navbar />
        <Footer />
      </div>
      <Routes>
          {/* Use `element` prop instead of `component` */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
    </Router>
  );
}

export default App;
