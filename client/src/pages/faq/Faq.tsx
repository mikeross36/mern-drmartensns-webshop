import { motion } from "framer-motion";
import { ESelectedPage } from "../../types/links";
import { useAppContext } from "../../hooks";
import { accordionItems } from "./data";
import AccordionItem from "./AccordionItem";
import OurTeam from "../../components/team/OurTeam";

export default function FAQ() {
  const { setSelectedPage } = useAppContext();

  return (
    <motion.section
      className="faq section"
      id="FAQ"
      onViewportEnter={() => setSelectedPage(ESelectedPage.FAQ)}
    >
      <h2 className="section__title">our team</h2>
      <p className="section__text">
        Our purpose is to empower rebellious self-expression. Our responsibility
        is to act as brand custodians. Our aim is to deliver long-term value for
        the business. Hearing your stories and seeing our shoes worn differently
        around the globe, is what it’s all about for us. As is witnessing two
        strangers find common ground over music or a new DM’s collaboration. Our
        online community is an amazing thing and we’ve loved seeing it grow.{" "}
      </p>
      <OurTeam />
      <div className="faq__accordion">
        <h2 className="section__title">FAQ</h2>
        <ul className="accordion__list">
          {accordionItems.map((item) => {
            return <AccordionItem key={item.id} item={item} />;
          })}
        </ul>
      </div>
    </motion.section>
  );
}
