import { Shield, CheckCircle, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroBanner from '../components/HeroBanner';

const Home = ({ onStartScreening }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">
              Professional Security Training
            </h2>
            <p className="fs-5 text-secondary">
              Comprehensive screening and training for security professionals
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="icon-circle mx-auto mb-3" style={{backgroundColor: 'rgba(32,68,108,0.1)'}}>
                  <Users size={32} color="#20446C" />
                </div>
                <h3 className="fs-4 fw-semibold mb-3">Expert Training</h3>
                <p className="text-secondary">
                  Learn from industry professionals with years of security experience
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="icon-circle mx-auto mb-3" style={{backgroundColor: 'rgba(32,68,108,0.1)'}}>
                  <CheckCircle size={32} color="#20446C" />
                </div>
                <h3 className="fs-4 fw-semibold mb-3">Certified Process</h3>
                <p className="text-secondary">
                  Industry-standard certification process with comprehensive screening
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="icon-circle mx-auto mb-3" style={{backgroundColor: 'rgba(32,68,108,0.1)'}}>
                  <Award size={32} color="#20446C" />
                </div>
                <h3 className="fs-4 fw-semibold mb-3">Career Growth</h3>
                <p className="text-secondary">
                  Advance your security career with professional development opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary-subtle">
        <div className="container text-center py-4">
          <h2 className="display-6 fw-bold mb-3">
            Ready to Start Your Security Career?
          </h2>
          <p className="fs-5 text-secondary mb-4">
            Join thousands of professionals who have completed our training program
          </p>
          <button 
            className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
            style={{ 
              backgroundColor: "#20446C",
              borderColor: "#20446C",
              color: '#fff',
              fontSize: "1.5rem", 
              boxShadow: "0 8px 15px rgba(32, 68, 108, 0.3)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onClick={onStartScreening ? onStartScreening : () => navigate('/screening')}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 20px rgba(32, 68, 108, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 15px rgba(32, 68, 108, 0.3)";
            }}
          >
            Begin Screening Process
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;