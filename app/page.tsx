"use client";
// import Image from "next/image";
// import styles from "./page.module.css";
import { useState } from "react";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares: (number | null)[]) {
    let nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares: (number | null)[], move: number) => {
    let text = move > 0 ? `Go to move #${move}` : "Got to game start";
    return (
      <div className="item" onClick={() => jumpTo(move)} key={move}>
        {text}
      </div>
    );
  });
  return (
    <main>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div className="history">{moves}</div>
    </main>
  );
}

function Board({ xIsNext, squares, onPlay }: any) {
  function handleClick(i: number) {
    if (squares[i] || calcWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    onPlay(newSquares);
  }
  const winner = calcWinner(squares);
  let status: string;
  if (winner) {
    status = `winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }
  return (
    <div className="game-board">
      <div className="status">{status}</div>
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function Square({ value, onClick }: any) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function calcWinner(squares: number[]): number | null {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
