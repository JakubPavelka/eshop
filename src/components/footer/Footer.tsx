import "./Footer.scss";
import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoInstagram,
} from "react-icons/bi";

const Footer = () => {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  return (
    <footer>
      <div className="container">
        <section className="footer-wrapper">
          <p className="copy">
            &copy; {currentYear} Eshop. All rights reserved.
          </p>
          <div className="footer-contact">
            <p>
              Tel: <a href="tel:+420123456789">+420 123 456 789</a>
            </p>
            <p>
              Email: <a href="mailto:eshop@gmail.com">eshop@gmail.com</a>
            </p>
          </div>
          <div className="footer-socials">
            <BiLogoFacebook />
            <BiLogoLinkedin />
            <BiLogoInstagram />
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
