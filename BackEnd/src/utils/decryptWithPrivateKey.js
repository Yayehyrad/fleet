function decryptWithPrivateKey(privateKey, ciphertext) {
  const buffer = Buffer.from(ciphertext, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return decrypted.toString("utf8");
}

module.exports = { decryptWithPrivateKey };
