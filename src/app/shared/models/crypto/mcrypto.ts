import * as CryptoJS from 'crypto-js';
const aes256 = require('aes256');

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

export class Mcrypto {
	private MCR_BK_PW: string = 'JC5RxG';
	private iv: string = 'ABCDabcdEFGHhits';
	private secretKey: string = '012HITFDSxyz4567';
	constructor() { }
	decryptPassword(code: string): string {
		const secretKeySalt: string = this.saltKey(this.MCR_BK_PW);
		return this.decryptString(code, secretKeySalt);
	}
	encryptPassword(text): string {
		const secretKeySalt: string = this.saltKey(this.MCR_BK_PW);
		return this.encryptString(text, secretKeySalt);
	}
	saltKey(extKey: string): string {
		return (
			extKey.substring(0, 4) + this.secretKey.substring(2, 12) + extKey.substring(1, 3)
		);
	}
	encryptString(text: string, secretKeySalt: string): string {
		if (!text || text.length == 0) {
			throw new Error('Emty string');
		}

		const textUint8Array: Uint8Array = this.stringToUint8Array(this.padString(text));

		const iv: Uint8Array = this.stringToUint8Array(this.iv);
		const keySpec: Uint8Array = this.stringToUint8Array(secretKeySalt);
		const encIv = CryptoJS.enc.Hex.parse(this.ua2hex(iv)); // ua2hex : convert Uint8Array to hex
		const encKey = CryptoJS.enc.Hex.parse(this.ua2hex(keySpec));

		const encrypted = CryptoJS.AES.encrypt(
			CryptoJS.enc.Hex.parse(this.ua2hex(textUint8Array)),
			encKey,
			{ iv: encIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding }
		);
		return encrypted.ciphertext.toString();
	}

	decryptString(code: string, secretKeySalt: string): string {
		if (!code || code.length == 0) {
			throw new Error('Emty string');
		}
		const iv: Uint8Array = this.stringToUint8Array(this.iv);
		const keySpec: Uint8Array = this.stringToUint8Array(secretKeySalt);

		const encIv = CryptoJS.enc.Hex.parse(this.ua2hex(iv)); // byte => hex => word array
		const encKey = CryptoJS.enc.Hex.parse(this.ua2hex(keySpec));
		const dataWordArray = CryptoJS.enc.Hex.parse(code);
		const data = new Data('', '', dataWordArray);
		const decrypted: any = CryptoJS.AES.decrypt(data, encKey, {
			iv: encIv,
			padding: CryptoJS.pad.NoPadding
		});
		const uint8ArrayDecrypt = new Uint8Array(decrypted.sigBytes);
		this.words2ua(uint8ArrayDecrypt, decrypted); // convert wordArray to Uint8Array
		let strDecrypt = String.fromCharCode.apply(null, uint8ArrayDecrypt);
		if (strDecrypt) {
			strDecrypt = strDecrypt.trim();
		}
		return strDecrypt;
	}

	padString(source: string): string {
		const paddingChar = ' ';
		const size: number = 16;
		const x = source.length % size;
		const padLength = size - x;

		for (let i = 0; i < padLength; i++) {
			source += paddingChar;
		}
		return source;
	}
	words2ua(destUa, cryptowords) {
		//words array to uint8Array
		for (let i = 0; i < destUa.length; i += 4) {
			let v = cryptowords.words[i / 4];
			if (v < 0) v += 0x100000000;
			destUa[i] = v >>> 24;
			destUa[i + 1] = (v >>> 16) & 0xff;
			destUa[i + 2] = (v >>> 8) & 0xff;
			destUa[i + 3] = v & 0xff;
		}
		return destUa;
	}

	stringToUint8Array(str) {
		let bytes = [];
		for (let i = 0; i < str.length; ++i) {
			const code = str.charCodeAt(i);
			bytes = bytes.concat([code]);
		}
		return Uint8Array.from(bytes);
	}
	Uint8ArrayToWordArray(ba) {
		const wa = [];
		for (let i = 0; i < ba.length; i++) {
			wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
		}

		return CryptoJS.lib.WordArray.create(wa);
	}

	wordToByteArray(word, length) {
		const ba = [];
		const xFF = 0xff;
		if (length > 0) ba.push(word >>> 24);
		if (length > 1) ba.push((word >>> 16) & xFF);
		if (length > 2) ba.push((word >>> 8) & xFF);
		if (length > 3) ba.push(word & xFF);

		return ba;
	}
	wordArrayToByteArray(wordArray, length) {
		if (wordArray.hasOwnProperty('sigBytes') && wordArray.hasOwnProperty('words')) {
			length = wordArray.sigBytes;
			wordArray = wordArray.words;
		}

		const result = [];
		let bytes;
		let i = 0;
		while (length > 0) {
			bytes = this.wordToByteArray(wordArray[i], Math.min(4, length));
			length -= bytes.length;
			result.push(bytes);
			i++;
		}
		return [].concat.apply([], result);
	}
	ua2hex(ua) {
		// byte to hex
		const _hexEncodeArray = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'a',
			'b',
			'c',
			'd',
			'e',
			'f'
		];

		let s = '';
		for (let i = 0; i < ua.length; i++) {
			const code = ua[i];
			s += _hexEncodeArray[code >>> 4];
			s += _hexEncodeArray[code & 0x0f];
		}
		return s;
	}

	hex2ua(hexx) {
		// hex to byte
		const hex = hexx.toString(); // force conversion
		const ua = new Uint8Array(hex.length / 2);
		for (let i = 0; i < hex.length; i += 2) {
			ua[i / 2] = parseInt(hex.substr(i, 2), 16);
		}
		return ua;
	}

	aes256Encrypt(key: string, plaintext: string) {
		return aes256.encrypt(key, plaintext);
	}

	aes256Decrypt(key: string, encrypted) {
		return aes256.decrypt(key, encrypted);
	}
}
