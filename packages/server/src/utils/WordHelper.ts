export function maskWord(word: string, guessedLetters: Set<string>): string[] {
  return word
    .split("")
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"));
}
