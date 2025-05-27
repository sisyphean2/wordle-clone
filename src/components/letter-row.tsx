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
    <>
      {row.map((letter) => {
        let color = "bg-no-guess";
        if (correctLetters.includes(letter)) {
          color = "bg-correct text-white";
        } else if (includedLetters.includes(letter)) {
          color = "bg-included text-white";
        } else if (usedLetters.includes(letter)) {
          color = "bg-missing text-white";
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
    </>
  );
}
