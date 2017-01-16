export class AmountByYear {
	public year: number;
	public amount: number;
}

export class Purchase {
	constructor(
		public software: any,
		public unit: any,
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

export function purchasedForYear(purchase: Purchase, forYear: number): boolean {
	for(let amountForYear of purchase.amounts) {
		if(amountForYear.year == forYear) {
			return true;
		}
	}
	return false;
}

export function totalAmountOfYears(purchase: Purchase, fromYear: number, endYear: number) {
	let sum = 0;
	for(let amountOfYear of purchase.amounts) {
		if( amountOfYear.year >= fromYear && amountOfYear.year <= endYear){
			sum += amountOfYear.amount;
		}
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

export function updatePurchaseFromArray(purchase: Purchase[], id: string, updatedPurchase: Purchase) {
	for(let i=0; i<purchase.length; i++){
		if(purchase[i]._id == id){
			purchase[i].amounts = updatedPurchase.amounts;
		}
	}
	return -1;
}