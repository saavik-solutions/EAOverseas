import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const location = useLocation();

    const handleHomeClick = () => {
        if (location.pathname === '/landing' || location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column footer-brand">
                    <h3 className="footer-brand-name">Eaoverseas</h3>
                    <p className="footer-description">
                        Your trusted partner for international education opportunities and guidance. We help students achieve their global education dreams.
                    </p>
                    <div className="footer-social desktop-social">
                        <a href="#" className="social-icon" aria-label="Twitter">
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.21 1.42C14.66 1.65 14.08 1.81 13.47 1.89C14.09 1.52 14.56 0.94 14.78 0.24C14.2 0.58 13.56 0.83 12.88 0.96C12.32 0.38 11.53 0 10.64 0C8.92 0 7.53 1.39 7.53 3.11C7.53 3.34 7.55 3.56 7.6 3.77C4.97 3.65 2.63 2.42 1.07 0.56C0.82 1.01 0.67 1.52 0.67 2.07C0.67 3.11 1.2 4.02 2 4.56C1.5 4.54 1.03 4.41 0.63 4.18V4.22C0.63 5.71 1.7 6.95 3.12 7.22C2.87 7.29 2.61 7.33 2.34 7.33C2.15 7.33 1.96 7.31 1.78 7.27C2.16 8.49 3.3 9.38 4.66 9.41C3.6 10.24 2.26 10.74 0.79 10.74C0.53 10.74 0.27 10.73 0 10.69C1.37 11.57 3 12.11 4.75 12.11C10.64 12.11 13.86 7.38 13.86 3.45C13.86 3.32 13.86 3.19 13.85 3.06C14.45 2.64 14.98 2.11 15.41 1.5L15.21 1.42Z" fill="white" />
                            </svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="Facebook">
                            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.17 0H5.86C3.39 0 1.83 1.66 1.83 4.23V6.18H0V9.12H1.83V16H4.84V9.12H7.96L8.61 6.18H4.84V4.54C4.84 3.62 5.07 3.15 6.25 3.15H8.61V0H8.17Z" fill="white" />
                            </svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="Instagram">
                            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.22 0C6.73 0 6.42 0.01 5.48 0.05C4.54 0.09 3.9 0.24 3.34 0.45C2.76 0.67 2.27 0.96 1.78 1.45C1.29 1.94 1 2.43 0.78 3.01C0.57 3.57 0.42 4.21 0.38 5.15C0.34 6.09 0.33 6.4 0.33 8.89C0.33 11.38 0.34 11.69 0.38 12.63C0.42 13.57 0.57 14.21 0.78 14.77C1 15.35 1.29 15.84 1.78 16.33C2.27 16.82 2.76 17.11 3.34 17.33C3.9 17.54 4.54 17.69 5.48 17.73C6.42 17.77 6.73 17.78 9.22 17.78C11.71 17.78 12.02 17.77 12.96 17.73C13.9 17.69 14.54 17.54 15.1 17.33C15.68 17.11 16.17 16.82 16.66 16.33C17.15 15.84 17.44 15.35 17.66 14.77C17.87 14.21 18.02 13.57 18.06 12.63C18.1 11.69 18.11 11.38 18.11 8.89C18.11 6.4 18.1 6.09 18.06 5.15C18.02 4.21 17.87 3.57 17.66 3.01C17.44 2.43 17.15 1.94 16.66 1.45C16.17 0.96 15.68 0.67 15.1 0.45C14.54 0.24 13.9 0.09 12.96 0.05C12.02 0.01 11.71 0 9.22 0ZM9.22 1.58C11.67 1.58 11.97 1.59 12.9 1.63C13.76 1.67 14.23 1.81 14.54 1.93C14.95 2.09 15.24 2.28 15.55 2.59C15.86 2.9 16.05 3.19 16.21 3.6C16.33 3.91 16.47 4.38 16.51 5.24C16.55 6.17 16.56 6.47 16.56 8.92C16.56 11.37 16.55 11.67 16.51 12.6C16.47 13.46 16.33 13.93 16.21 14.24C16.05 14.65 15.86 14.94 15.55 15.25C15.24 15.56 14.95 15.75 14.54 15.91C14.23 16.03 13.76 16.17 12.9 16.21C11.97 16.25 11.67 16.26 9.22 16.26C6.77 16.26 6.47 16.25 5.54 16.21C4.68 16.17 4.21 16.03 3.9 15.91C3.49 15.75 3.2 15.56 2.89 15.25C2.58 14.94 2.39 14.65 2.23 14.24C2.11 13.93 1.97 13.46 1.93 12.6C1.89 11.67 1.88 11.37 1.88 8.92C1.88 6.47 1.89 6.17 1.93 5.24C1.97 4.38 2.11 3.91 2.23 3.6C2.39 3.19 2.58 2.9 2.89 2.59C3.2 2.28 3.49 2.09 3.9 1.93C4.21 1.81 4.68 1.67 5.54 1.63C6.47 1.59 6.77 1.58 9.22 1.58Z" fill="white" />
                                <path d="M9.22 12.24C7.34 12.24 5.82 10.72 5.82 8.84C5.82 6.96 7.34 5.44 9.22 5.44C11.1 5.44 12.62 6.96 12.62 8.84C12.62 10.72 11.1 12.24 9.22 12.24ZM9.22 3.86C6.47 3.86 4.24 6.09 4.24 8.84C4.24 11.59 6.47 13.82 9.22 13.82C11.97 13.82 14.2 11.59 14.2 8.84C14.2 6.09 11.97 3.86 9.22 3.86Z" fill="white" />
                                <circle cx="14.42" cy="3.66" r="1.04" fill="white" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="footer-column">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/landing" onClick={handleHomeClick}>Home</Link></li>
                        <li><Link to="/blogs" onClick={() => { if (location.pathname === '/blogs') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Blogs</Link></li>
                        <li><Link to="/login" state={{ from: '/test-prep' }}>Test Prep</Link></li>
                        <li><Link to="/testimonials" onClick={() => { if (location.pathname === '/testimonials') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Testimonials</Link></li>
                    </ul>
                </div>

                <div className="footer-column desktop-help-section">
                    <h4 className="footer-heading">Help</h4>
                    <ul className="footer-links">

                        <li><Link to="/terms" onClick={() => { if (location.pathname === '/terms') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Terms & Conditions</Link></li>
                        <li><Link to="/privacy-policy" onClick={() => { if (location.pathname === '/privacy-policy') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Privacy Policy</Link></li>
                        <li><Link to="/cookie-policy" onClick={() => { if (location.pathname === '/cookie-policy') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Cookie Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4 className="footer-heading">Contact Us</h4>
                    <ul className="footer-contact">
                        <li><a href="mailto:info@eaoverseas.com">info@eaoverseas.com</a></li>
                        <li><a href="tel:+919701563362">+91 9701563362</a></li>
                        <li>
                            123 Education Ave, Suite 200<br />
                            New York, NY 10001<br />
                            United States
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 Eaoverseas. All rights reserved.</p>
                <div className="mobile-footer-links">
                    <Link to="/terms" onClick={() => { if (location.pathname === '/terms') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Terms & Conditions</Link>
                    <Link to="/privacy-policy" onClick={() => { if (location.pathname === '/privacy-policy') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Privacy Policy</Link>
                    <Link to="/cookie-policy" onClick={() => { if (location.pathname === '/cookie-policy') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Cookie Policy</Link>
                </div>
                <div className="footer-social mobile-social">
                    <a href="#" className="social-icon" aria-label="Twitter">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.21 1.42C14.66 1.65 14.08 1.81 13.47 1.89C14.09 1.52 14.56 0.94 14.78 0.24C14.2 0.58 13.56 0.83 12.88 0.96C12.32 0.38 11.53 0 10.64 0C8.92 0 7.53 1.39 7.53 3.11C7.53 3.34 7.55 3.56 7.6 3.77C4.97 3.65 2.63 2.42 1.07 0.56C0.82 1.01 0.67 1.52 0.67 2.07C0.67 3.11 1.2 4.02 2 4.56C1.5 4.54 1.03 4.41 0.63 4.18V4.22C0.63 5.71 1.7 6.95 3.12 7.22C2.87 7.29 2.61 7.33 2.34 7.33C2.15 7.33 1.96 7.31 1.78 7.27C2.16 8.49 3.3 9.38 4.66 9.41C3.6 10.24 2.26 10.74 0.79 10.74C0.53 10.74 0.27 10.73 0 10.69C1.37 11.57 3 12.11 4.75 12.11C10.64 12.11 13.86 7.38 13.86 3.45C13.86 3.32 13.86 3.19 13.85 3.06C14.45 2.64 14.98 2.11 15.41 1.5L15.21 1.42Z" fill="white" />
                        </svg>
                    </a>
                    <a href="#" className="social-icon" aria-label="Facebook">
                        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.17 0H5.86C3.39 0 1.83 1.66 1.83 4.23V6.18H0V9.12H1.83V16H4.84V9.12H7.96L8.61 6.18H4.84V4.54C4.84 3.62 5.07 3.15 6.25 3.15H8.61V0H8.17Z" fill="white" />
                        </svg>
                    </a>
                    <a href="#" className="social-icon" aria-label="Instagram">
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.22 0C6.73 0 6.42 0.01 5.48 0.05C4.54 0.09 3.9 0.24 3.34 0.45C2.76 0.67 2.27 0.96 1.78 1.45C1.29 1.94 1 2.43 0.78 3.01C0.57 3.57 0.42 4.21 0.38 5.15C0.34 6.09 0.33 6.4 0.33 8.89C0.33 11.38 0.34 11.69 0.38 12.63C0.42 13.57 0.57 14.21 0.78 14.77C1 15.35 1.29 15.84 1.78 16.33C2.27 16.82 2.76 17.11 3.34 17.33C3.9 17.54 4.54 17.69 5.48 17.73C6.42 17.77 6.73 17.78 9.22 17.78C11.71 17.78 12.02 17.77 12.96 17.73C13.9 17.69 14.54 17.54 15.1 17.33C15.68 17.11 16.17 16.82 16.66 16.33C17.15 15.84 17.44 15.35 17.66 14.77C17.87 14.21 18.02 13.57 18.06 12.63C18.1 11.69 18.11 11.38 18.11 8.89C18.11 6.4 18.1 6.09 18.06 5.15C18.02 4.21 17.87 3.57 17.66 3.01C17.44 2.43 17.15 1.94 16.66 1.45C16.17 0.96 15.68 0.67 15.1 0.45C14.54 0.24 13.9 0.09 12.96 0.05C12.02 0.01 11.71 0 9.22 0ZM9.22 1.58C11.67 1.58 11.97 1.59 12.9 1.63C13.76 1.67 14.23 1.81 14.54 1.93C14.95 2.09 15.24 2.28 15.55 2.59C15.86 2.9 16.05 3.19 16.21 3.6C16.33 3.91 16.47 4.38 16.51 5.24C16.55 6.17 16.56 6.47 16.56 8.92C16.56 11.37 16.55 11.67 16.51 12.6C16.47 13.46 16.33 13.93 16.21 14.24C16.05 14.65 15.86 14.94 15.55 15.25C15.24 15.56 14.95 15.75 14.54 15.91C14.23 16.03 13.76 16.17 12.9 16.21C11.97 16.25 11.67 16.26 9.22 16.26C6.77 16.26 6.47 16.25 5.54 16.21C4.68 16.17 4.21 16.03 3.9 15.91C3.49 15.75 3.2 15.56 2.89 15.25C2.58 14.94 2.39 14.65 2.23 14.24C2.11 13.93 1.97 13.46 1.93 12.6C1.89 11.67 1.88 11.37 1.88 8.92C1.88 6.47 1.89 6.17 1.93 5.24C1.97 4.38 2.11 3.91 2.23 3.6C2.39 3.19 2.58 2.9 2.89 2.59C3.2 2.28 3.49 2.09 3.9 1.93C4.21 1.81 4.68 1.67 5.54 1.63C6.47 1.59 6.77 1.58 9.22 1.58Z" fill="white" />
                            <path d="M9.22 12.24C7.34 12.24 5.82 10.72 5.82 8.84C5.82 6.96 7.34 5.44 9.22 5.44C11.1 5.44 12.62 6.96 12.62 8.84C12.62 10.72 11.1 12.24 9.22 12.24ZM9.22 3.86C6.47 3.86 4.24 6.09 4.24 8.84C4.24 11.59 6.47 13.82 9.22 13.82C11.97 13.82 14.2 11.59 14.2 8.84C14.2 6.09 11.97 3.86 9.22 3.86Z" fill="white" />
                            <circle cx="14.42" cy="3.66" r="1.04" fill="white" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
