import { useEffect, useState } from "react";
import { Square } from "./square";
import toast from "react-hot-toast";

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(false);

  const notify = (winner: string) =>
    toast("Winner: " + winner, {
      icon: "👏",
    });

  const handleClick = (index: number) => {
    if (squares[index]) return;
    if (calculateWinner(squares)) return;
    const newSquares = [...squares];
    newSquares[index] = isNext ? "O" : "X";
    setSquares(newSquares);
    setIsNext(!isNext);
  };

  function calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const countDownToRestart = () => {
    let count = 5;
    const interval = setInterval(() => {
      toast("Restarting in " + count);
      if (count === 0) {
        clearInterval(interval);
        restart();
      }
      count--;
    }, 1000);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setIsNext(false);
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      notify(winner);
      countDownToRestart();
    }
  }, [squares]);

  return (
    <>
      <div className="board">
        {squares.map((square, index) => {
          return (
            <Square
              key={index}
              value={square}
              onClick={() => handleClick(index)}
            />
          );
        })}
      </div>

      <button onClick={restart}>
        <span className="button_top">Restart</span>
      </button>
    </>
  );
};
