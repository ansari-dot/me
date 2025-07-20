
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import ScreeningWrapper from "./pages/ScreeningWrapper";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';

const queryClient = new QueryClient();

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0
      }}>
        <img src={logo} alt="Logo" style={{ height: 120, width: 'auto', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.08))' }} />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/screening" element={<ScreeningWrapper />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;