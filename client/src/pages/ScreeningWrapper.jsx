import Screening from "./Screening";
import backgroundImg from '../assets/background.png';
import { useEffect } from 'react';

const ScreeningWrapper = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
    document.body.style.width = '100%';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.minHeight = '';
      document.body.style.width = '';
    };
  }, []);
  return (
    <div className="d-flex flex-column min-h-screen">
      <Screening />
    </div>
  );
};

export default ScreeningWrapper;