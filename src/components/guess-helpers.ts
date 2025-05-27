export default function getGuessColors(answer: string[], guess: string[], isSubmitted: boolean): string[] {
  const letterTracker = [...answer];

  console.log(guess)
  const colors: string[] = answer.map((letter, index) => {
    let color = "bg-missing text-white";
    if (!isSubmitted) {
      guess[index]
      if (guess[index]) {
        return "bg-white bg-no-guess border border-2 border-missing text-black";
      } 
      return "bg-white bg-no-guess border border-2 border-no-guess text-black";
    } else if (isSubmitted && guess[index] === letter) {
      const index = letterTracker.indexOf(letter);
      letterTracker.splice(index, 1);
      return "bg-correct text-white";
    }

    return color;
  });

  // The case where a letter is guessed twice but only occurs once is awkward to handle cleanly.
  colors.forEach((color, colorIndex) => {
    if (letterTracker.includes(guess[colorIndex]) && isSubmitted) {
      colors[colorIndex] = "bg-included text-white";
      const index = letterTracker.indexOf(guess[colorIndex]);
      letterTracker.splice(index, 1);
    }
  });

  return colors
}
