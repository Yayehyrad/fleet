function encryptWithPublicKey(publicKey, plaintext) {
  const buffer = Buffer.from(plaintext, "utf8");
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return encrypted.toString("base64");
}
const publicKeyObject = crypto.createPublicKey({
  key: publicKey,
  format: "pem",
});

module.exports = { encryptWithPublicKey };
