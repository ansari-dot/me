import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "./Home";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreeningWrapper from "./ScreeningWrapper";
import backgroundImg from '../assets/background.png';

const Index = () => {
  const navigate = useNavigate();
  const [showScreening, setShowScreening] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/register');
    }
  }, [navigate]);

  useEffect(() => {
    if (showScreening) {
      document.body.style.backgroundImage = `url(${backgroundImg})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
    } else {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundPosition = '';
    }
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundPosition = '';
    };
  }, [showScreening]);

  if (showScreening) {
    return (
      <div className="d-flex flex-column min-h-screen">
        <ScreeningWrapper />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Home onStartScreening={() => setShowScreening(true)} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;