import { motion } from "framer-motion";
import { useAppContext } from "../../hooks";
import { ESelectedPage } from "../../types/links";
import { ERoutes } from "../../types/links";
import { Link } from "react-router-dom";
import { aboutItems, whyItems } from "./data";
import { socialSvgs } from "../../components/social-svgs/data";
import aboutBcgImg from "@/assets/images/main-bcg-img2.jpg";
import Button from "../../components/Button";
import AboutItem from "./AboutItem";
import WhyItem from "./WhyItem";

export default function AboutUs() {
  const { setSelectedPage } = useAppContext();

  return (
    <motion.section
      className="about__us"
      id="about"
      onViewportEnter={() => setSelectedPage(ESelectedPage.about)}
    >
      <div className="about__us-background-img">
        <img src={aboutBcgImg} alt="about us page background image" />
      </div>
      <div className="about__title">
        <h3>about us</h3>
      </div>
      <div className="about__us-wrapper grid">
        <div className="about__us-content">
          <h3>Dr Martens a history of rebellious self expression</h3>
          <p>
            Dr. Martens' appeal to people who have their own individual style
            but share a united spirit – authentic characters who stand for
            something. People who possess a proud sense of self- expression.
            People who are different.
          </p>
          <p>
            On a stylistic level, Dr. Martens' simple silhouettes allows their
            wearers to adopt the boots and shoes as part of their own individual
            and very distinctive style; on a practical level, their famous
            durability and comfort make them ideal for the unforgiving world of
            gigs and street fashion; and then finally on an emotional level,
            they are a badge of attitude and empowerment.
          </p>
          <p>
            However, it wasn't always this way: Dr. Martens were originally a
            modest work-wear boot that was even sold as a gardening shoe at one
            stage. So, how did this utilitarian boot transform into one of the
            most culturally relevant brands of the modern era? It is an
            interesting and unique story
          </p>
          <Link to={ERoutes.martens}>
            <Button type="button" className="button-light" text="explore" />
          </Link>
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
        <div className="about__us-management">
          <ul className="about__us-items">
            {aboutItems.map((item) => {
              return <AboutItem key={item.id} item={item} />;
            })}
          </ul>
        </div>
      </div>
      <div className="about__us-whys grid">
        <div className="about__title">
          <h3>why shop with us</h3>
        </div>
        <ul className="why__items">
          {whyItems.map((item) => {
            return <WhyItem key={item.id} item={item} />;
          })}
        </ul>
      </div>
    </motion.section>
  );
}
