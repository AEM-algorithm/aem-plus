import { Storage } from '@ionic/storage';
import { AppPin } from '@app/shared/models/app-password';
import { TestBed, async } from '@angular/core/testing';
import { AppPasswordRepositoryService } from '@services/repository/app-password-repository/app-password-repository.service';
import { StorageMock } from '@test-config/mocks-ionic';

describe('AppPassWordRepository Service', () => {
	describe('Test encryptionWithPrivateKey', () => {
		let appPassWordRepository: AppPasswordRepositoryService;
		let storage: Storage;
		const passphrase = '111111';
		const privateKey = '1111111111111111111111111111111111111111111111111111111111111111';
		const expectResult = '22d623daa1c140327607071bbd854ad3';
		beforeEach(async(() => {
			configureTestingModule();
			storage = TestBed.get(Storage);

			appPassWordRepository = new AppPasswordRepositoryService(storage);
		}));
		it('should be encrypted', async(() => {
			expect(
				appPassWordRepository.encryptionWithPrivateKey(passphrase, privateKey)
			).toEqual(expectResult);
		}));
	});
	describe('Test decrypWithPrivateKey', () => {
		let appPassWordRepository: AppPasswordRepositoryService;
		let storage: Storage;
		const privateKey = '1111111111111111111111111111111111111111111111111111111111111111';
		const passphraseEncrypted = '22d623daa1c140327607071bbd854ad3';
		const passphraseExpect = '111111';
		beforeEach(async(() => {
			configureTestingModule();
			storage = TestBed.get(Storage);

			appPassWordRepository = new AppPasswordRepositoryService(storage);
		}));

		it('should be decrypted', async(() => {
			expect(
				appPassWordRepository.decrypWithPrivateKey(passphraseEncrypted, privateKey)
			).toEqual(passphraseExpect);
		}));
	});
	describe('Test getPassword', () => {
		let appPassWordRepository: AppPasswordRepositoryService;
		let storage: Storage;
		const data =
			'eyJoYXNoUGFzc3dvcmQiOiIxMTEiLCJzYWx0UGFzc3dvcmQiOiIxMTEiLCJwYXNzUGhyYXNlIjoiMTExIiwiaXNFbmNyeXB0ZWRQYXNzcGhyYXNlIjp0cnVlfQ==';
		const expectResult: AppPin = {
			hashPassword: '111',
			saltPassword: '111',
			passPhrase: '111',
			isEncryptedPassphrase: true
		};
		beforeEach(async(() => {
			configureTestingModule();
			storage = TestBed.get(Storage);
			spyOn(storage, 'get').and.callFake(() => Promise.resolve(data));

			appPassWordRepository = new AppPasswordRepositoryService(storage);
		}));

		it('should be got appPassword', async(async () => {
			const password = await appPassWordRepository.getPassword('password');
			expect(password).toEqual(expectResult);
		}));
	});

	describe('Test savePassword', () => {
		let appPassWordRepository: AppPasswordRepositoryService;
		let storage: Storage;
		const password = {
			hashPassword: '111',
			saltPassword: '111',
			passPhrase: '111',
			isEncryptedPassphrase: false
		};
		const key = 'password';
		let appPassword: AppPin;
		const privateKey = '1111111111111111111111111111111111111111111111111111111111111111';
		beforeEach(async(() => {
			configureTestingModule();
			appPassword = new AppPin(
				password.hashPassword,
				password.saltPassword,
				password.passPhrase,
				password.isEncryptedPassphrase
			);
			storage = TestBed.get(Storage);

			spyOn(storage, 'set').and.callFake(() => Promise.resolve());

			appPassWordRepository = new AppPasswordRepositoryService(storage);
			appPassWordRepository.savePassword(appPassword, key);
		}));

		it('should store password', async(async () => {
			expect(storage.set).toHaveBeenCalled();
		}));
	});
});

function configureTestingModule() {
	TestBed.configureTestingModule({
		imports: [],
		providers: [{ provide: Storage, useClass: StorageMock }, AppPasswordRepositoryService]
	});
}
