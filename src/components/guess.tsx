"use client";
import { twJoin } from "tailwind-merge";
import getGuessColors from "./guess-helpers";

type GuessProps = {
  answer: string[];
  guess: string[];
  isSubmitted: boolean;
};

export default function Guess({ answer, guess, isSubmitted }: GuessProps) {
  const colors = getGuessColors(answer, guess, isSubmitted);

  return (
    <div className="flex">
      {Array(5)
        .fill("")
        .map((guessLetter, index) => {
          const displayItem = guess.at(index) ?? "";

          return (
            <span
              className={twJoin(
                "p-2 w-12 h-12 m-1 text-2xl inline-block font-bold text-center",
                colors[index]
              )}
              key={index}
            >
              {displayItem}
            </span>
          );
        })}
    </div>
  );
}
