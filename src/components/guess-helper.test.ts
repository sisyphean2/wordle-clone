import getGuessColors from "./guess-helpers";

test('the first letter is out of place', () => {
  const answer = "GOOSE".split("")
  const guess = "SPLIT".split("");
  const colors = getGuessColors(answer, guess, true);
  expect(colors).toStrictEqual([
    "bg-amber-400 text-white",
    "bg-gray-300 text-white",
    "bg-gray-300 text-white",
    "bg-gray-300 text-white",
    "bg-gray-300 text-white",
  ]);
});

test('a letter that occurs once is guess twice', () => {
  const answer = "RADIO".split("")
  const guess = "GOOSE".split("");
  const colors = getGuessColors(answer, guess, true);
  expect(colors).toStrictEqual([
    "bg-gray-300 text-white",
    "bg-amber-400 text-white",
    "bg-gray-300 text-white",
    "bg-gray-300 text-white",
    "bg-gray-300 text-white",
  ]);
});

test('the answer is correct', () => {
  const answer = "GOOSE".split("")
  const guess = "GOOSE".split("");
  const colors = getGuessColors(answer, guess, true);
  expect(colors).toStrictEqual([
    "bg-green-500 text-white",
    "bg-green-500 text-white",
    "bg-green-500 text-white",
    "bg-green-500 text-white",
    "bg-green-500 text-white",
  ]);
});
