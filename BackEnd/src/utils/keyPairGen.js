const crypto = require("crypto");
const randomGenerator = require("./random");
const Key = require("../models/keypair");

async function generateKeyPair() {
  try {
    const salt = await randomGenerator.generateRandomBytes(16);

    return new Promise((resolve, reject) => {
      crypto.generateKeyPair(
        "rsa",
        {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            // cipher: "aes-256-cbc",
            // passphrase: salt,
          },
        },
        (err, publicKey, privateKey) => {
          if (err) {
            reject(err);
          } else {
            resolve({ publicKey, privateKey });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error generating key pair:", error);
    throw error;
  }
}

async function saveKeyPair(keyPair) {
  try {
    const key = new Key(keyPair);
    await key.save();
  } catch (error) {
    console.error("Error saving key pair:", error);
    throw error;
  }
}

generateKeyPair()
  .then((keyPair) => {
    console.log("Generated Key Pair:");
    console.log("Public Key:", keyPair.publicKey);
    console.log("Private Key:", keyPair.privateKey);
    // saveKeyPair(keyPair);
  })
  .catch((error) => {
    console.error("Error generating key pair:", error);
  });

// module.exports = {
//   encryptWithPublicKey,
//   decryptWithPrivateKey,
// };

// function encryptWithPublicKey(publicKey, plaintext) {
//   const buffer = Buffer.from(plaintext, "utf8");
//   const encrypted = crypto.publicEncrypt(
//     {
//       key: publicKey,
//       padding: crypto.constants.RSA_PKCS1_PADDING,
//     },
//     buffer
//   );
//   return encrypted.toString("base64");
// }

// function decryptWithPrivateKey(privateKey, ciphertext) {
//   const buffer = Buffer.from(ciphertext, "base64");
//   const decrypted = crypto.privateDecrypt(
//     {
//       key: privateKey,
//       padding: crypto.constants.RSA_PKCS1_PADDING,
//     },
//     buffer
//   );
//   return decrypted.toString("utf8");
// }

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtQ4hA/P/I0ItnKhnuzjB
kfPWdwTcQFIG2HfaJAKyudwOo929qVRJEP9W/2qeV3Q6CuGu6q9ZEhTMmad9Hjm7
bH63HV7BVK0e/7SebM9se4vfrtHNh8lXk+/QNBb8nscO+579dOMu+u0MElzmls96
fRfFFO4JjRc6GypluheLn5kDLnR7iimkEfYFi59uK0/RwokHpmZcDMucdH7Kz495
ebH+NAqa1UR83ipeZIvG98g+tNAT31rtyOnynGFFVZpV1KzTQb6V9Ej4ahEmgoQ5
vosDXP6ROKETJkaw8dgpgDJUQxUkz4X6hjoY09ueob4wBOQbEdYUXg+q0yoM+jWy
AwIDAQAB
-----END PUBLIC KEY-----`;
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1DiED8/8jQi2c
qGe7OMGR89Z3BNxAUgbYd9okArK53A6j3b2pVEkQ/1b/ap5XdDoK4a7qr1kSFMyZ
p30eObtsfrcdXsFUrR7/tJ5sz2x7i9+u0c2HyVeT79A0Fvyexw77nv104y767QwS
XOaWz3p9F8UU7gmNFzobKmW6F4ufmQMudHuKKaQR9gWLn24rT9HCiQemZlwMy5x0
fsrPj3l5sf40CprVRHzeKl5ki8b3yD600BPfWu3I6fKcYUVVmlXUrNNBvpX0SPhq
ESaChDm+iwNc/pE4oRMmRrDx2CmAMlRDFSTPhfqGOhjT256hvjAE5BsR1hReD6rT
Kgz6NbIDAgMBAAECggEAFwYa8LPAiC1MO5W2yzomc3b8mNoHYC6OLEzhcp7dN4Fi
Yzg5fCT5va2a1JQsWpavIt8cLT/rJb97XTbNVGCnEt7yTkvUbf4t6PqBAvlFpFhf
M43+gvv5pRhj85vQuCg8IYdQV+LkAIjQdi1WLWto+ithpo22rTh87SNxGD8SRFMr
2thdE0N8+1AadqyMTweYnTdNTciqH6sxXuLPGWGMVL9ttsIbl//9rtiNR13YwKDF
IIldK/ioPXJkv+fuxZRHOseiJ9/YepN3fospMoo5O2VPu8s6FxKYOKN/XSh/1rsy
pzClhdxKTyXTkofkx+Zgj4t9gIEGMFRzhpC7bpxdUQKBgQDwg0EwAr1ZYc+hvjvB
XsvILH2vdl/Ley0qeN0GMf1NCNhaoRlLnmL7CtsT1qShvskQKR0hL74NzOxXn0N1
lLm/GmHP4Yj1SoXUv1bW3ij9ltWIyst6E7wNi7HhaqfYaln8xYj2NWsL0cZ+ZNVz
NqfIkh7kPeEdQpyQFuwdkEKkRQKBgQDAtr5TOEb+PPy+ZSoUg6gcXDyJu3v4UovM
abfS3NRJXh6thU87nP+udokZCkY+RgkkTq3L4SJ9YLmHgS5RFtqqierG8FYN8XVr
+cZMhJy7VmID5+72Y9g0Ij0UzoTh2ZtbCq98PYc8vqVIOPpFuAe0+1bIfZ/bPEw4
cEzdMBV1pwKBgQDaymwoorVhdCsPtiBh3jx/EoobbhHi52DE/EIEesE0rNE0UMzU
D3d3a/6zY1VMlmQNwXjwUaAQqdRuOUGC2xLGF9fW5hJTIcHxMUZsHJkpZ2dFE0Za
/Uza/bOJnh6mLslBuujHIP0KOYDaRhwuvQ+Q0+wqMWhx18DZCyEsG6mkCQKBgBXi
Koaks1sXbdPpBPhDYwmlZ7J0OcWfCgTyVE97iBe0umMV6kNotpgHGdZgFk3oAg2/
aXjnXdVC8I50mt/WaopHEwP4Mq1up9jVCjGSNYIIcyTiZ35PJDP3V1xPf0NuRHf4
JKlFC2BYfchPwAu+tBFXISmvKkHo/PbDuda8KROtAoGAeTclFsfIj+e/9jW/7iI8
Eajs1uzfrnrC0JKUKcoU6m0oWP28Oiljkhh7Q07uJJH3dd8VvsggBjOXmz/XHO5d
bppUCeMn/SbDuD7g2cnPDH/rkhwfm7+Q4RZQYE2f4wgXSwYZO0naLHurqLX3JKhJ
ye5UxlAOde5+vFRplkX91NI=
-----END PRIVATE KEY-----`;

// const publicKeyObject = crypto.createPublicKey({
//   key: publicKey,
//   format: "pem",
// });
// const privateKeyObject = crypto.createPrivateKey({
//   key: privateKey,
//   format: "pem",
// });

// console.log("Public Key Object:", publicKeyObject);

// const ciphertext = encryptWithPublicKey(publicKeyObject, "hello");

// const text = decryptWithPrivateKey(privateKeyObject, ciphertext);

// console.log("Encrypted ciphertext:", ciphertext);
// console.log("Encrypted ciphertext:", text);

// function encryptWithPublicKey(publicKey, plaintext = "hello") {
//   const buffer = Buffer.from(plaintext, "utf8");
//   const encrypted = crypto.publicEncrypt(
//     {
//       key: publicKey,
//       padding: crypto.constants.RSA_PKCS1_PADDING,
//     },
//     buffer
//   );
//   return encrypted.toString("base64");
// }

// function decryptWithPrivateKey(privateKey, ciphertext) {
//   const buffer = Buffer.from(ciphertext, "base64");
//   const decrypted = crypto.privateDecrypt(privateKey, buffer);
//   return decrypted.toString("utf8");
// }

// Encrypt with public key
// const ciphertext = encryptWithPublicKey(
//   (publicKey = `-----BEGIN PUBLIC KEY-----
//   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk4nN+v2Qn+D0kJ3/rgoF
//   6JYXDwOiMwe/N9qr3vnRkES+pXtQmaz0jo8SGSWR07vxeRU60qbC6YKSA8Xw3pq9
//   ecHjzbMCt2uWr3oOAUhHgUticnJvex+NWnaLIkA8tgaHr9Tyh+7zMNPvrQv2/o+9
//   wW/7sAdp5L3bS4BhV1wD/LaU5CRkNaFpyWOd/8hpT+TagdSMddKtXkWV7Xl93sM0
//   AJt9T4FcYHsVW/xwAj5ASNYp4JcwTj/qmqyAmv9F4efTwyebX0oKrR18CqnFUyIC
//   UWZgzDGrvSk/QYVS906TUFjYlyRKiB3rUWPf2HlXNyykwcVZEEcRgIaV4XmQO1Vs
//   7QIDAQAB
//   -----END PUBLIC KEY-----`),
//   "hello"
// );
// console.log("Encrypted ciphertext:", ciphertext);
// return ciphertext;

// Decrypt with private key
// const decryptedPlaintext = decryptWithPrivateKey(
//   `-----BEGIN ENCRYPTED PRIVATE KEY-----
// MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIa6qi3rWKW5ACAggA
// MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBCAX2DQIrXkSCiG4GL6DxuSBIIE
// 0NoLB1a9MwKUxf1jIiDKEJHlfRLh3cGGF4vvo3zgrCNCvtfG+j759Um+sLnwpngy
// QqeJXa3nMVVaTeFo6+KvUrxojMoEXdNibt05x4JYhFr+bknkyUHIi6VnFkSmsJke
// haaHhtdlD3WgtgKj8xjU76CeaR0Ia5yug7xhLn28z2vZ/ZQbEth03x42i+pHw8q/
// oFFNlbF06ekhTm6yN/8ZWrKDlfShSWCjw24nWWpafwq4qlWcYRhaodnTViMni4fs
// cbEBU0j64HJISsvoRwABXK9tHgttsaOIK+NYXn/I4wko8D1t/EH34U+WJz4AMs3e
// nzOoGCcDCwX9femwX4HAivRkCYLoWqsuhsLwd78RJK1WkHoAZ/NrkhgtJnkO+Jgm
// pLHuGqxYzNtOHchUDJllLvHvpA+EcjF+K9OKOyE7JFHI+9k3QjatnjXODbBE4mvI
// Rf+KnpHcUZwZmLR63cqX3ufWY1dO6lHDrNmmybmNZO9BR1fLriEOCFVxpVIjWgph
// CpcMGSIDQzQozWNXsdJK5wBnLAOdcNiuWHt8VzofivYeV+Eb3aJVax8XMip6bOpZ
// gYo2EaVr/cZKWcj9TeAqzSPkPbpBOdk8RtNDKl0sE+8Vj5aZuWRkwBglEFvkE5ue
// va3pzJB0GQbbhb1ykJqIqYVNRRmCt1OxF+xUipNZU7VMR7Iz2jrOQREn/Ff/SG/L
// GN2XNvaPCZDMgnLKWqRr2w0xYKvtkXI6nsYGFAyO5V7VVNO/kwnZqT40vWYHgCIm
// JhOPG88t8HnJo8QZj/uTRtkLAXO/IG8k4lgsJW7URTx2JnF3MVTakkg/mmag4y7m
// ML2vJ+wuMS4M0/a0Yt99460+TWDyKTZ9pSnGTfgtbSWJORXhiJcR5pGzkxjYsKtu
// oWrDEyMDmH+H6s93AeFDvqc15dE2HXS5kkMLklaYVWdfrKO5l4Eg7X0xzZNx7Kja
// 7Iq4e+7r+Qjsoo+mf74x+rmkDFd0UnqtARtwbf2gghEzfkfXeer/9GlaWsMddGET
// DVNeuCBtl6RTPP8J3ScBalsyco1VBL5ys/SWEW+MOzMToap+ldDFgGWNu6vJi+cT
// 3j48EW4bBkaASHb9xV8YtL9VLmapHJRszLIX2CjIeYV8E3Hvsi5y8V2yjRqMjiue
// 8lbRIvTZTjYcUH9EPu3zWdFjUZfos/LLGm41FCu1VBPQum0q0y/LwSZKVzGwYkSX
// TxNRCaoOBBVoFGt1f6Q1rr11hFSRPg6+395DqVNhvSHiXAHBnmL8/oPg1nzRm0BU
// 6spd8J6bApXovvzkKnjIIN/m6siI80OywcxaZP82te/J569b9RPhEjMFfVBiIVc6
// Nygnhy5MzunYM1I2mt9IYfApR7kVG4pRAf5hgae+lpLY6ycC6YGufXOFeCCPt/dm
// JN9cE12oj97wxbnfr5lhRhS4Zr79lNSAwHvnLfSMkHoHwcZbYBtxRocpWFh/SHfM
// nioeiAEceTCqdUr/+hFxwbxiOjSQbgOwPesYbgigeoBtktNDcM5xMt7jfCI1KzWa
// WU9J+iKLn1ZGF1h/NLjgWitAWGH8u2HSJFvw7jJDzbcyzFyCv2Pt7Qo80AhJsHas
// vQAxhzZAefrVGMKM0KRHj03HkGvNzgw7sy5sWhcXEGgI
// -----END ENCRYPTED PRIVATE KEY-----`,
//   ciphertext
// );
// console.log("Decrypted plaintext:", decryptedPlaintext);
