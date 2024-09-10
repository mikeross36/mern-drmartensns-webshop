import { TextEffect } from "../../components/TextEffect";

type AccordionItemType = {
  id: string;
  question: string;
  answer: string;
};

export default function AccordionItem({ item }: { item: AccordionItemType }) {
  return (
    <details className="accordion__item" onClick={() => window.location.reload}>
      <summary className="item__question">{item.question}</summary>
      <TextEffect per="char" preset="scale" className="item__answer">
        {item.answer}
      </TextEffect>
    </details>
  );
}
