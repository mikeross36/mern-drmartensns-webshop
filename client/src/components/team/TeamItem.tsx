import TeamSocials from "./TeamSocials";
import { TeamItemType } from "./data";

export default function TeamItem({ item }: { item: TeamItemType }) {
  return (
    <li className="profile__card">
      <div className="profile__card-image">
        <img src={item.photo} alt="" className="profile__img" />
      </div>
      <div className="profile__card-data">
        <h4>{item.name}</h4>
        <p>{item.role}</p>
        <p>{item.email}</p>
        <TeamSocials />
      </div>
    </li>
  );
}
