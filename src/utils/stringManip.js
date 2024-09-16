export function randomlyManipulateString(str) {
  let manipulatedStr = str.split("");

  // Shuffle characters randomly
  for (let i = manipulatedStr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [manipulatedStr[i], manipulatedStr[j]] = [
      manipulatedStr[j],
      manipulatedStr[i],
    ];
  }

  // Change the case of some characters randomly
  manipulatedStr = manipulatedStr.map((char) => {
    if (Math.random() > 0.5) {
      return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }
    return char;
  });

  // Add random characters at random positions
  const randomChars = "!@#$%^&*";
  for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
    const randomIndex = Math.floor(Math.random() * manipulatedStr.length);
    const randomChar =
      randomChars[Math.floor(Math.random() * randomChars.length)];
    manipulatedStr.splice(randomIndex, 0, randomChar);
  }

  return manipulatedStr.join("");
}

export function reverseManipulation(manipulatedStr, originalLength) {
  const randomChars = "!@#$%^&*";

  // Remove the random characters addeda
  let reversedStr = manipulatedStr
    .split("")
    .filter((char) => !randomChars.includes(char));

  // Restore original case
  reversedStr = reversedStr.map((char) => char.toLowerCase());

  // Restore original order
  const restoredStr = reversedStr.slice(0, originalLength);

  return restoredStr.join("");
}
