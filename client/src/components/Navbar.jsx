import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import backgroundImg from '../assets/background.png';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [showScreeningTooltip, setShowScreeningTooltip] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/user/logout`, {}, { withCredentials: true });
    } catch (err) {
      // Ignore errors, just clear local storage
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar} style={{
      position: 'absolute',
      top: '32px',
      left: 0,
      width: '100%',
      background: 'rgba(32,68,108,0.0)',
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 9999,
    }}>
      <div className={styles.container}>
        <div className="d-flex justify-content-center align-items-center py-3 w-100" style={{position: 'relative'}}>
          {/* Centered Navigation and Buttons */}
          <div className="d-none d-md-flex align-items-center justify-content-center w-100" style={{gap: '32px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
              <Link to="/" className={styles.link}>
                Home
              </Link>
              <a href="#" className={styles.link}>
                About us
              </a>
              <a href="#" className={styles.link}>
                Services
              </a>
              <a href="#" className={styles.link}>
                Info
              </a>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              {/* Start Screening Button */}
              <button 
                className={styles.screeningBtn}
                onClick={() => navigate('/screening')}
                style={{transition: 'background 0.2s, color 0.2s'}}
              >
                Start Screening
              </button>
              {/* Login/Logout Button */}
              {user && user.email ? (
                <button className="btn" style={{marginLeft: 8, borderRadius: 24, fontWeight: 600, padding: '6px 22px', background: '#0C3C78', color: '#fff', border: 'none'}} onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button className="btn btn-outline-primary" style={{marginLeft: 8, borderRadius: 24, fontWeight: 600, padding: '6px 22px'}} onClick={() => navigate('/login')}>
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="d-md-none" style={{position: 'absolute', right: 0}}>
            <button
              className="btn btn-link text-light p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="d-md-none border-top py-2 bg-primary">
            <div className="d-flex flex-column">
              <Link to="/" className="py-2 text-light text-decoration-none hover-text-secondary">
                Home
              </Link>
              <a href="#" className="py-2 text-light text-decoration-none hover-text-secondary">
                About us
              </a>
              <a href="#" className="py-2 text-light text-decoration-none hover-text-secondary">
                Services
              </a>
              <a href="#" className="py-2 text-light text-decoration-none hover-text-secondary">
                Info
              </a>
              <div className="d-flex flex-column gap-2 py-2">
                <button 
                  className="btn w-100 fw-semibold py-2"
                  style={{
                    backgroundColor: '#801515',
                    color: '#fff',
                    border: '2px solid #801515',
                    borderRadius: '30px',
                    boxShadow: '0 2px 8px rgba(123,35,41,0.10)',
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px',
                    fontFamily: 'inherit',
                  }}
                  onClick={() => navigate('/screening')}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = '#801515';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#801515';
                  }}
                >
                  Start Screening
                </button>
                {user && user.email ? (
                  <button className="btn btn-outline-danger w-100 fw-semibold py-2 mt-2" style={{borderRadius: 24}} onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <button className="btn btn-outline-primary w-100 fw-semibold py-2 mt-2" style={{borderRadius: 24}} onClick={() => navigate('/login')}>
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;