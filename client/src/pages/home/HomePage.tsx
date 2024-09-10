import { useAppContext } from "../../hooks";
import { motion } from "framer-motion";
import { ESelectedPage } from "../../types/links";
import { ERoutes } from "../../types/links";
import { homeCubes } from "./data";
import { Link } from "react-router-dom";
import homeBcgImg from "@/assets/images/main-bcg-img3.jpg";
import Button from "../../components/Button";
import HomeSlider from "./HomeSlider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function HomePage() {
  const { setSelectedPage } = useAppContext();

  return (
    <motion.section
      className="home"
      id="home"
      onViewportEnter={() => setSelectedPage(ESelectedPage.home)}
    >
      <div className="home__background-img">
        <img src={homeBcgImg} alt="home page background image" />
      </div>
      <div className="home__container">
        <div className="home__boot">
          <div className="home__data">
            <h3 className="home__new">new in</h3>
            <h1>crazy dr martensNs boots</h1>
            <h3 className="home__description">
              Explre new collection of dr Martens footwear
            </h3>
            <Link to={ERoutes.martens}>
              <Button className="button" type="button" text="explore" />
            </Link>
          </div>
          <div className="cube__wrapper">
            <ul className="cube__grid">
              {homeCubes.map((cube) => {
                return (
                  <li key={cube.id} className="little__cube">
                    <LazyLoadImage
                      width={"100%"}
                      height={"100%"}
                      effect="blur"
                      src={cube.image}
                      alt="home cube image"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <HomeSlider />
      </div>
    </motion.section>
  );
}
