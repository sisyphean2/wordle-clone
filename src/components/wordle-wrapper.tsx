"use client";

import { twJoin } from "tailwind-merge";
import LetterRow from "./letter-row";
import { useState } from "react";
import Guess from "./guess";
import { VALID_WORDS } from "@/data/valid-words";

const answer = "GHOST";
const ROW_ONE = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const ROW_TWO = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const ROW_THREE = ["Z", "X", "C", "V", "B", "N", "M"];

export default function WordleWrapper() {
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));
  const [numberGuesses, setNumberGuesses] = useState(0);
  const [status, setStatus] = useState("guessing");

  const completedGuesses = guesses.slice(0, numberGuesses);
  const splitAnswer = answer.split("");
  const correctLetters: string[] = [];
  const includedLetters: string[] = [];
  const usedLetters = completedGuesses.flat().join().split("");

  splitAnswer.forEach((letter, index) => {
    if (usedLetters.includes(letter)) {
      includedLetters.push(letter);
    }
    completedGuesses.forEach((guess) => {
      if (guess[index] === letter) {
        correctLetters.push(letter);
      }
    });
  });

  const handleLetter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (status === "incomplete") {
      setStatus("guessing");
    }
    const target = event.target as HTMLButtonElement;
    setGuesses((prevState) => {
      const freshGuesses = [...prevState];
      const length = freshGuesses[numberGuesses].length;
      if (length > 4) return freshGuesses;
      freshGuesses[numberGuesses] = freshGuesses[numberGuesses] + target.value;
      return freshGuesses;
    });
  };

  const handleBack = () => {
    if (status === "invalid" || status === "incomplete") {
      setStatus("guessing");
    }
    setGuesses((prevState) => {
      const freshGuesses = [...prevState];
      const currentGuess = freshGuesses[numberGuesses];
      const length = currentGuess.length;
      freshGuesses[numberGuesses] = currentGuess.slice(0, length - 1);
      return freshGuesses;
    });
  };

  const handleSubmit = () => {
    if (guesses[numberGuesses].length < 5) {
      setStatus("incomplete");
    } else if (VALID_WORDS.includes(guesses[numberGuesses].toLowerCase())) {
      setNumberGuesses(numberGuesses + 1);
      if (answer === guesses[numberGuesses]) {
        setStatus("won");
      } else if (numberGuesses + 1 === 6) {
        setStatus("loss");
      }
    } else {
      setStatus("invalid");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-xl">Wordle Clone</h2>
      {guesses.map((singleGuess, outerIndex) => {
        return (
          <Guess
            answer={splitAnswer}
            guess={singleGuess.split("")}
            isSubmitted={outerIndex < numberGuesses}
            key={outerIndex}
          />
        );
      })}
      {status === "incomplete" ? (
        <div className="p-2 mt-1 rounded-lg bg-rose-500 text-gray-100">
          A guess requires five letters.
        </div>
      ) : null}
      {status === "invalid" ? (
        <div className="p-2 mt-1 rounded-lg bg-rose-500 text-gray-100">
          Submission not in word list.
        </div>
      ) : null}
      {status === "loss" ? (
        <div className="p-2 mt-1 rounded-lg bg-rose-500 text-gray-100">
          I'm sorry, you're out of guesses.
        </div>
      ) : null}
      {status === "won" ? (
        <div className="p-2 mt-1 rounded-lg bg-correct text-gray-100">
          Congratulations! You got it!
        </div>
      ) : null}
      {status === "guessing" ? <div className="h-10 mt-1"></div> : null}
      <div className="m-2">
        <LetterRow
          correctLetters={correctLetters}
          includedLetters={includedLetters}
          row={ROW_ONE}
          usedLetters={usedLetters}
          handleLetter={handleLetter}
        />
      </div>
      <div className="m-2">
        <LetterRow
          correctLetters={correctLetters}
          includedLetters={includedLetters}
          row={ROW_TWO}
          usedLetters={usedLetters}
          handleLetter={handleLetter}
        />
      </div>
      <div className="m-2">
        <button
          className="bg-no-guess p-2 w-20 h-12 rounded-sm m-1 font-bold inline"
          onClick={handleSubmit}
        >
          Enter
        </button>
        <LetterRow
          correctLetters={correctLetters}
          includedLetters={includedLetters}
          row={ROW_THREE}
          usedLetters={usedLetters}
          handleLetter={handleLetter}
        />
        <button
          className="bg-no-guess p-2 w-20 h-12 rounded-sm m-1 font-bold inline"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}
