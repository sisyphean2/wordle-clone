export default function getGuessColors(answer: string[], guess: string[], isSubmitted: boolean): string[] {
  const letterTracker = [...answer];

  const colors: string[] = answer.map((letter, index) => {
    let color = "bg-gray-300 text-white";
    if (!isSubmitted) {
      return "bg-white border border-2 border-gray-600 text-black";
    } else if (isSubmitted && guess[index] === letter) {
      const index = letterTracker.indexOf(letter);
      letterTracker.splice(index, 1);
      return "bg-green-500 text-white";
    }

    return color;
  });

  // The case where a letter is guessed twice but only occurs once is awkward to handle cleanly.
  colors.forEach((color, colorIndex) => {
    if (letterTracker.includes(guess[colorIndex]) && isSubmitted) {
      colors[colorIndex] = "bg-amber-400 text-white";
      const index = letterTracker.indexOf(guess[colorIndex]);
      letterTracker.splice(index, 1);
    }
  });

  return colors
}
