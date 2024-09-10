import { WhyItemsType } from "./data";

export default function WhyItem({ item }: { item: WhyItemsType }) {
  return (
    <li className="why__item">
      <div className="palette">
        <div className="palette__cover">
          <div className="palette__cover-border">
            <span>{item.title}</span>
          </div>
        </div>
        <div className="palette__base">
          <div className="base__image">
            <img src={item.itemImg} alt="why item image" />
          </div>
        </div>
      </div>
      <h4>
        <small>why shop with us</small>
        {item.title}
        <small>{item.text}</small>
      </h4>
    </li>
  );
}
