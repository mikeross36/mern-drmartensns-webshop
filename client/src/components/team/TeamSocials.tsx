import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function TeamSocials() {
  return (
    <ul className="team__socials">
      <li>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
          className="footer__social-link"
        >
          <FaFacebook className="social__icon" />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noreferrer"
          className="footer__social-link"
        >
          <FaTwitter className="social__icon" />
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          className="footer__social-link"
        >
          <FaInstagram className="social__icon" />
        </a>
      </li>
    </ul>
  );
}
