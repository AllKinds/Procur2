export class Software {
	constructor(
			public productId: number,
			public productName: string,
			public publisherName: string,
			public licenceCost: number,
			public id?: string
		){}
	longStringify():string {
		return "Software ID:\t" + this.productId + "\n Software publisher:\t" + this.publisherName + 
				"\n Software Price:\t" + this.licenceCost;
	}
}
