import { useRef } from "react";
import { useScroll } from "framer-motion";
import Header from "../components/header/Header";
import HomePage from "./home/HomePage";
import ShopPage from "./ShopPage";
import CategoriesPage from "./CategoriesPage";
import AboutUs from "./about/AboutUs";
// import OurTeam from "../components/stars/team/OurTeam";
import FAQ from "./faq/Faq";
import Footer from "../components/Footer";
import ShoppingCart from "../components/shopping-cart/ShoppingCart";

export default function Layout() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <>
      <ShoppingCart />
      <Header />
      <HomePage />
      <div className="paralax" ref={container}>
        <ShopPage scrollYProgress={scrollYProgress} />
        <CategoriesPage scrollYProgress={scrollYProgress} />
      </div>
      <AboutUs />
      {/* <OurTeam /> */}
      <FAQ />
      <Footer />
    </>
  );
}
