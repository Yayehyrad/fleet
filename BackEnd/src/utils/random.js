const crypto = require("crypto");

function generateRandomBytes(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString("hex"));
      }
    });
  });
}

console.log(generateRandomBytes);

module.exports = { generateRandomBytes };
