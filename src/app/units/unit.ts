export class Unit {
	constructor(
			public unitId: string,
			public subUnit: string,
			public _id?: string
		){}
}

export function deleteUnitFromArray(unit: Unit[], id: string) {
	for(let i=0; i<unit.length; i++){
		if(unit[i]._id == id){
			unit.splice(i,1);
			return 1;
		}
	}
	return -1;
}