export class AmountByYear {
	public year: number;
	public amount: number;
}

export class Purchase {
	constructor(
		public softwareId: number,
		public unitId: number,
		public subUnit: string,
		public amounts: AmountByYear[],
		public _id?: string
	) {}
}

export function totalAmount(purchase: Purchase): number {
	let sum = 0;
	for(let amountOfYear of purchase.amounts) {
		sum += amountOfYear.amount;
	}
	return sum;
}

export function deletePurchaseFromArray(purchase: Purchase[], id: string) {
	for(let i=0; i<purchase.length; i++){
		if(purchase[i]._id == id){
			purchase.splice(i,1);
			return 1;
		}
	}
	return -1;
}