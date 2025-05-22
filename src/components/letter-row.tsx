"use client";
import { twJoin } from "tailwind-merge";

type LetterRowProps = {
  correctLetters: string[];
  includedLetters: string[];
  row: string[];
  usedLetters: string[];
  handleLetter: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function LetterRow({
  correctLetters,
  includedLetters,
  row,
  usedLetters,
  handleLetter,
}: LetterRowProps) {
  return (
    <div className="m-2">
      {row.map((letter) => {
        let color = "bg-gray-300";
        if (correctLetters.includes(letter)) {
          color = "bg-green-500 text-white";
        } else if (includedLetters.includes(letter)) {
          color = "bg-amber-400 text-white";
        } else if (usedLetters.includes(letter)) {
          color = "bg-gray-600 text-white";
        }

        return (
          <button
            className={twJoin(
              "p-2 w-10 h-12 rounded-sm m-1 font-bold inline",
              color
            )}
            key={letter}
            onClick={handleLetter}
            value={letter}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
