export class PriceByYear {
	year: 	number;
	price: 	number;
}

export class Software {
	constructor(
			public softwareId: any,
			public softwareName: string,
			public publisherName: string,
			public licenceCost: number,
			public _id?: string,
			public pricesByYear?: Array<PriceByYear>,
			public properties?: Object
		){}
}


export function deleteSoftwareFromArray(softwares: Software[], id: string) {
	for(let i=0; i<softwares.length; i++){
		if(softwares[i]._id == id){
			softwares.splice(i,1);
			return 1;
		}
	}
	return -1;
}

export function getPriceByYear(software: Software, year?:number): number {
	if(!year) {
		let year = (new Date()).getFullYear;
	}
	if(!software){
		return -1;
	}

	if(!software.pricesByYear){
		return software.licenceCost;
	}

	for(let i=0; i<software.pricesByYear.length; i++){
		if(software.pricesByYear[i].year == year){
			return software.pricesByYear[i].price;
		}
	}
	return software.licenceCost;
}

export function updateSoftwareFromArray(software: Software[], id: string, updatedSoftware: Software) {
	for(let i=0; i<software.length; i++){
		if(software[i]._id == id){
			software[i].pricesByYear = updatedSoftware.pricesByYear;
		}
	}
	return -1;
}