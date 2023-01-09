export class DonationWalletModal {
	constructor(
		public id: string,
		public icon: any,
		public type: string,
		public address: string,
		public balance: number,
		public currency: string,
		public convertedBalance: number,
		public convertedCurrency: string,
		public exchangeRate: number,
		public simpleWallet: any,
	) {}
}
