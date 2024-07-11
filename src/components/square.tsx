interface ISquareProps {
  value?: string;
  onClick?: () => void;
}

export const Square = (props: ISquareProps) => {
  const { value, onClick } = props;

  return (
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
};
