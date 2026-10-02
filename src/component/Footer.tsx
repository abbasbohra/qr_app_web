import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <img src="/logo.png" alt="" className="footer-logo" />
            TapCard
          </div>
          <p>
            Create QR codes with your profile, business info, or menu. Share
            with one scan — no app needed for the viewer.
          </p>
        </div>
        <div>
          <h4>Product</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link to="/delete-account">Delete Account</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} TapCard. All rights reserved.
      </div>
    </footer>
  );
}
