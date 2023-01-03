export class DonationWalletModal {
	constructor(
		public icon: any,
		public type: string,
		public address: string,
		public balance: number,
		public currency: number,
		public convertedBalance: string,
		public convertedCurrency: number,
	) {}
}
