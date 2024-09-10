type PropTypes = {
  className: string;
  text?: string;
  type: "submit" | "reset" | "button" | undefined;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

export default function Button({
  className,
  text,
  type,
  style,
  onClick,
  children,
}: PropTypes) {
  return (
    <button className={className} type={type} style={style} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
