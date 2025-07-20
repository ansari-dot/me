import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-light border-top" style={{background: 'linear-gradient(0deg, #f8f9fa 80%, #20446C 100%)'}}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <Shield className="me-2" size={32} color="#20446C" />
              <span className="fs-4 fw-bold text-primary">Shehrity Security</span>
            </div>
            <p className="text-secondary mb-4 mw-100">
              Professional security services you can trust. We provide comprehensive training and 
              screening for all our security personnel to ensure the highest standards of service.
            </p>
            <div className="d-flex gap-3">
              <Facebook className="social-icon" size={20} color="#20446C" />
              <Twitter className="social-icon" size={20} color="#20446C" />
              <Linkedin className="social-icon" size={20} color="#20446C" />
              <Instagram className="social-icon" size={20} color="#20446C" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3">
            <h5 className="fw-semibold mb-3 text-primary">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none hover-text-primary">About Us</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none hover-text-primary">Services</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none hover-text-primary">Training Programs</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none hover-text-primary">Careers</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none hover-text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-3">
            <h5 className="fw-semibold mb-3 text-primary">Contact Info</h5>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center">
                <Phone className="me-2" size={16} color="#7B2329" />
                <span className="text-secondary">+1 (555) 123-4567</span>
              </div>
              <div className="d-flex align-items-center">
                <Mail className="me-2" size={16} color="#7B2329" />
                <span className="text-secondary">info@shehrity.com</span>
              </div>
              <div className="d-flex">
                <MapPin className="me-2 mt-1" size={16} color="#7B2329" />
                <span className="text-secondary">
                  123 Security Ave<br />Safety City, SC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-top mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-secondary small mb-md-0">
            © 2024 Shehrity Security Services. All rights reserved.
          </p>
          <div className="d-flex gap-3">
            <a href="#" className="text-secondary small text-decoration-none hover-text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary small text-decoration-none hover-text-primary">
              Terms of Service
            </a>
            <a href="#" className="text-secondary small text-decoration-none hover-text-primary">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Yousef Credit */}
        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-secondary small">
            Powered by <span className="text-primary fw-medium">Webmantis</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;