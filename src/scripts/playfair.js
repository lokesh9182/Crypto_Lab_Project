// Function to generate the key square
function generateKeySquare(keyword) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const uniqueChars = [];
  const keySquare = [];

  // Remove duplicate characters from the keyword
  for (const char of keyword) {
    const upperChar = char.toUpperCase();
    if (!uniqueChars.includes(upperChar)) {
      uniqueChars.push(upperChar);
    }
  }

  // Build the key square
  for (let i = 0; i < uniqueChars.length; i++) {
    keySquare.push(uniqueChars[i]);
  }

  for (let i = 0; i < alphabet.length; i++) {
    const upperAlphabetChar = alphabet[i];
    if (!uniqueChars.includes(upperAlphabetChar)) {
      keySquare.push(upperAlphabetChar);
    }
  }
  return keySquare;
}

// Function to perform Playfair encryption
function playfairEncrypt(text, keyword) {
  const keySquare = generateKeySquare(keyword.toUpperCase());
  const textLength = text.length;
  let encryptedText = "";
  let pos1, pos2, row1, row2, col1, col2;

  // Handling odd-length text by adding a placeholder character
  if (textLength % 2 !== 0) {
    text += "X";
  }

  for (let i = 0; i < textLength; i += 2) {
    pos1 = keySquare.indexOf(text[i].toUpperCase());
    pos2 = keySquare.indexOf(text[i + 1].toUpperCase());
    row1 = Math.floor(pos1 / 5);
    col1 = pos1 % 5;
    row2 = Math.floor(pos2 / 5);
    col2 = pos2 % 5;

    // Same letter in the same row
    if (row1 === row2) {
      encryptedText += keySquare[row1 * 5 + ((col1 + 1) % 5)];
      encryptedText += keySquare[row1 * 5 + ((col2 + 1) % 5)];
    }
    // Same letter in the same column
    else if (col1 === col2) {
      encryptedText += keySquare[((row1 + 1) % 5) * 5 + col1];
      encryptedText += keySquare[((row2 + 1) % 5) * 5 + col1];
    }
    // Rectangle case
    else {
      encryptedText += keySquare[row1 * 5 + col2];
      encryptedText += keySquare[row2 * 5 + col1];
    }
  }

  return encryptedText;
}

// Function to perform Playfair decryption
function playfairDecrypt(text, keyword) {
  const keySquare = generateKeySquare(keyword.toUpperCase());
  const textLength = text.length;
  let decryptedText = "";
  let pos1, pos2, row1, row2, col1, col2;

  // Handling odd-length text by adding a placeholder character
  if (textLength % 2 !== 0) {
    text += "X";
  }

  for (let i = 0; i < textLength; i += 2) {
    pos1 = keySquare.indexOf(text[i].toUpperCase());
    pos2 = keySquare.indexOf(text[i + 1].toUpperCase());
    row1 = Math.floor(pos1 / 5);
    col1 = pos1 % 5;
    row2 = Math.floor(pos2 / 5);
    col2 = pos2 % 5;

    // Same letter in the same row
    if (row1 === row2) {
      decryptedText += keySquare[row1 * 5 + ((col1 + 4) % 5)];
      decryptedText += keySquare[row1 * 5 + ((col2 + 4) % 5)];
    }
    // Same letter in the same column
    else if (col1 === col2) {
      decryptedText += keySquare[((row1 + 4) % 5) * 5 + col1];
      decryptedText += keySquare[((row2 + 4) % 5) * 5 + col1];
    }
    // Rectangle case
    else {
      decryptedText += keySquare[row1 * 5 + col2];
      decryptedText += keySquare[row2 * 5 + col1];
    }
  }

  return decryptedText;
}
// Exporting the functions
export { playfairEncrypt, playfairDecrypt };
// Example usage:
const keyword = "KEYWORD";
const plaintext = "HELLO";
const ciphertext = playfairEncrypt(plaintext, keyword);
console.log("Encrypted: ", ciphertext);
const decryptedText = playfairDecrypt(ciphertext, keyword);
console.log("Decrypted: ", decryptedText);
