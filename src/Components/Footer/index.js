import React from "react";
import "./style.css";
import GitHub from "../../Icons/github.svg";
const Footer = () => {
  return (
    <div className="wrapper">
      <i class="fa-brands fa-github"></i>
      <div className="button">
        <div className="icon">
          <i className="fab fa-facebook-f"></i>
        </div>
        <a
          className="removeHiperLinks"
          href="https://www.facebook.com/WearThere-102306738950908"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Facebook</span>
        </a>
      </div>
      <div className="button">
        <div className="icon">
          <i className="fab fa-instagram"></i>
        </div>
        <a
          className="removeHiperLinks"
          href="https://www.instagram.com/wearthere_/?fbclid=IwAR3G3T4Xv970_HeR1Asbppnvu47JHSVM0qcRY9bWSPuEqpiWNzOfhoCLa2U"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Instagram</span>
        </a>
      </div>
      <div className="button">
        <div className="icon">
          <i className="fab fa-github"></i>
        </div>
        <a
          className="removeHiperLinks"
          href="https://github.com/WildCodeSchool/2021-09-lisbon-webdev-project2-group3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
