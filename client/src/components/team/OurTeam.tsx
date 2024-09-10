import { teamItems } from "./data";
import TeamItem from "./TeamItem";

export default function OurTeam() {
  return (
    <section className="our__team">
      <div className="items__wrapper">
        <ul className="our_team-items">
          {teamItems.map((item) => {
            return <TeamItem key={item.id} item={item} />;
          })}
        </ul>
      </div>
    </section>
  );
}
