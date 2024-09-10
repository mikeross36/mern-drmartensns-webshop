export type SlideType = {
  title?: string;
  subtitle?: string;
  description?: string;
  image: string;
};

export default function Slide({
  slide,
  offset,
}: {
  slide: SlideType;
  offset: number;
}) {
  const active = offset === 0 ? true : null;
  return (
    <div
      className="slide"
      data-active={active}
      style={
        {
          "--offset": offset.toString(),
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
        } as React.CSSProperties
      }
    >
      <div className="slideBackground">
        <div
          className="slideContent"
          style={{ backgroundImage: `url('${slide.image}')` }}
        ></div>
      </div>
    </div>
  );
}
