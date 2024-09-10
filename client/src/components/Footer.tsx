import { socialSvgs } from "./social-svgs/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container grid">
        <div className="footer__box">
          <h3 className="footer__title">explore</h3>
          <ul className="link__list">
            <li>
              <a
                href="https://blog.drmartens.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                boot blog
              </a>
            </li>
            <li>
              <a
                href="https://www.drmartens.com/us/en/guides/our-soles"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                know your soles
              </a>
            </li>
            <li>
              <a
                href="https://www.drmartens.com/us/en/collaborations"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                collaborations
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__box">
          <h3 className="footer__title">support</h3>
          <ul className="link__list">
            <li>
              <a
                href="https://www.drmartens.com/us/en/guides/how-to-break-in-docs"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                how to brake in
              </a>
            </li>
            <li>
              <a
                href="https://www.drmartens.com/us/en/guides/how-to-polish-boots-shoes"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                how to polish
              </a>
            </li>
            <li>
              <a
                href="https://www.drmartens.com/us/en/guides/how-to-protect-maintain"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                how to protect
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__box social">
          <ul className="social__svgs">
            {socialSvgs.map((item) => {
              return (
                <li key={item.id} className="icon__content">
                  <a
                    href={item.href}
                    aria-label={item.label}
                    data-social={item.data}
                  >
                    <div className="filled"></div>
                    {item.icon({})}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <a
        href="https://www.vladimir-monarov.com/"
        target="_blank"
        rel="noreferrer"
      >
        <p className="footer__copy">
          &copy;2022 DodaDesign All Rights Reserved
        </p>
      </a>
    </footer>
  );
}
