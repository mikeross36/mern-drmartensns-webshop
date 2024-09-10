import { AboutItemType } from "./data";

export default function AboutItem({ item }: { item: AboutItemType }) {
  return (
    <li className="cube__container">
      <div className="cube">
        <div className="face front">
          <img
            src={item.photo}
            alt="about us cube image"
            className="cube__img"
          />
        </div>
        <div className="face back">
          <img
            src={item.photo}
            alt="about us cube image"
            className="cube__img"
          />
        </div>
        <div className="face right">
          <img
            src={item.photo}
            alt="about us cube image"
            className="cube__img"
          />
        </div>
        <div className="face left">
          <img
            src={item.photo}
            alt="about us cube image"
            className="cube__img"
          />
        </div>
        <div className="face top">
          <img
            src={item.photo}
            alt="about us cube image"
            className="cube__img"
          />
        </div>
        <div className="face bottom">
          <img
            src={item.photo}
            alt="about us cube image"
            className="cube__img"
          />
        </div>
      </div>
    </li>
  );
}
