class Data {
	addr: string;
	amount: number;
	msg: string;
	name: string;
}

export class NemQrcodeModel {
	v: number;
	type: number;
	data: Data;
	constructor(
		v: number,
		type: number,
		data: Data,
		) {
		this.v = v;
		this.type = type;
		this.data = data;
	}
}
