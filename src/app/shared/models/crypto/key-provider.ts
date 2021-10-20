import { WordArray } from 'crypto-js';
import * as CryptoJS from 'crypto-js';

export class KeyProvider {
	public static generatedSalt(): number[] {
		try {
			const array: Uint8Array = new Uint8Array(32);
			window.crypto.getRandomValues(array);
			const salt: number[] = Array.from(array);
			return salt;
		} catch (e) {
			throw new Error('SHA1PRNG is not supported on this device');
		}
	}
	public static deriveKey(password: string, salt: string) {
		const saltWordArray: WordArray = CryptoJS.enc.Hex.parse(salt);
		const key = CryptoJS.PBKDF2(password, saltWordArray, {
			keySize: 256 / 32,
			iterations: 2000
		}).toString();
		return key;
	}

	public static decryptKey(encryptedPrivateKey: string, key: string) {
		const iv = encryptedPrivateKey.substring(0, 32);
		console.log(iv);

		const encryptedPrvKey = encryptedPrivateKey.substring(32, 128);

		const encKey: WordArray = CryptoJS.enc.Hex.parse(key);
		const encIv: string = CryptoJS.enc.Hex.parse(iv);

		const dataWordArray: WordArray = CryptoJS.enc.Hex.parse(encryptedPrvKey);
		const data = new Data('', '', dataWordArray);
		return CryptoJS.AES.decrypt(data, encKey, { iv: encIv }).toString();
	}

	public static encryptKey(privateKey: string, key: string): string {
		const iv = CryptoJS.lib.WordArray.random(256 / 16);
		const keyWordArray = CryptoJS.enc.Hex.parse(key);

		const encryptedPrivateKey = CryptoJS.AES.encrypt(
			CryptoJS.enc.Hex.parse(privateKey),
			keyWordArray,
			{ iv: iv }
		);

		return iv.toString() + encryptedPrivateKey.ciphertext.toString();
	}
}
class Data implements CryptoJS.WordArray {
	iv: string;
	salt: string;
	ciphertext: string;
	constructor(iv, salt, ciphertext) {
		this.iv = iv;
		this.salt = salt;
		this.ciphertext = ciphertext;
	}
}
