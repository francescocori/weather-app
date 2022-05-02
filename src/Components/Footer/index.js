import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="rounded-social-buttons">
        <a className="social-button facebook" href="https://www.facebook.com/">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a className="social-button twitter" href="https://www.twitter.com/">
          <i class="fab fa-twitter"></i>
        </a>
        <a
          className="social-button linkedin"
          href="https://www.linkedin.com/in/francesco-coriolano/"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          className="social-button github"
          href="https://github.com/francescocori"
        >
          <i class="fab fa-github"></i>
        </a>
        <a
          className="social-button instagram"
          href="https://www.instagram.com/"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
