export class Software {
	constructor(
			public softwareId: number,
			public softwareName: string,
			public publisherName: string,
			public licenceCost: number,
			public _id?: string
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