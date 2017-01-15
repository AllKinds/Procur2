export type Permissions =
		"Basic"
	|	"Unit"
	|	"Manager"
	|	"Admin"


export class User {
	id: string;
	// firstName: string;
	// lastName: string;
	name: string;
	permission: Permissions;
	authCode: string;
	unitId: string;

	constructor(id:string, name:string, permission?: Permissions, unitId?: string){
		this.id = id;
		this.name = name;
		this.permission = permission? permission : "Basic";
		this.authCode = "V3ry5ecuredC0de";
		if(unitId) { this.unitId = unitId };
	}

	
}