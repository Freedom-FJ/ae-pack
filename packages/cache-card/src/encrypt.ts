import forge from 'node-forge';
import uuid from './uuid';

// AES对称加密
function aesEncrypt(initKey: string, str: string) {
  // 创建一个包含你密钥的 `Buffer`
  const keyBuffer = forge.util.createBuffer(forge.util.encodeUtf8(initKey));

  // 使用 key 和 ECB 模式创建 cipher
  const cipher = forge.cipher.createCipher('AES-ECB', keyBuffer);

  // 使用随机IV（实际应用中可能需要保存此IV以便解密）
  const iv = forge.random.getBytesSync(16);
  cipher.start({ iv });

  // 对字符串进行编码并加密
  const input = forge.util.createBuffer(forge.util.encodeUtf8(str));
  cipher.update(input);
  cipher.finish();

  // 获取加密后的数据，并将其转换为 Base64
  const encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
}

// RSA非对称加密
function rsaEncrypt(publicKeyBase64: string, str: string) {
  const pem = `-----BEGIN PUBLIC KEY-----${publicKeyBase64}-----END PUBLIC KEY-----`;
  const publicKey = forge.pki.publicKeyFromPem(pem);
  const encrypted = publicKey.encrypt(str);
  const encoded = encodeURIComponent(forge.util.encode64(encrypted));
  return encoded;
}

// cacheCard 加密
export function encryptForCard(publicKey: string, str: string) {
  const initKey = uuid().replace(/-/g, '');
  const body = aesEncrypt(initKey, str);
  const key = rsaEncrypt(publicKey, initKey);
  return { key, body };
}
