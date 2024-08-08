export function maskWord(
  word: string,
  guessedLetters: Set<string> = new Set()
): string[] {
  return word
    .toLowerCase()
    .split("")
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"));
}
