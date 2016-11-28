import { Software } from './software';
import { Unit } 	from './unit';

export class AmountByYear {
	public year: number;
	public amount: number;
}

export class Purchase {
	constructor(
		// public software: Software,
		// public unit: Unit,
		public softwareId: number,
		public unitId: number,
		public subUnit: string, // CHANGE??
		public amounts: AmountByYear[]
	) {}

	public totalAmount():number {
		let sum = 0;
		for( let amountOfYear of this.amounts) {
			sum += amountOfYear.amount;
		}
		return sum;
	}
}