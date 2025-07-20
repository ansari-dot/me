import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div className="d-flex flex-column min-h-screen">
      <Navbar />
      <div className="flex-1 d-flex align-items-center justify-content-center py-5">
        <div className="text-center">
          <h1 className="display-1 fw-bold" style={{color: '#20446C'}}>404</h1>
          <h2 className="fs-1 mb-4" style={{color: '#20446C'}}>Page Not Found</h2>
          <p className="text-secondary mb-4">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-secondary px-4 py-2" style={{backgroundColor: '#7B2329', borderColor: '#7B2329', color: '#fff'}}>
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;