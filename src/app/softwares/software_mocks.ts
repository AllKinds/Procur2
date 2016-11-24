import { Software } from './software';

// export const SOFTWARES: Software[] = [{
// 		"productId": 1,
// 		"publisherName": "Word",
// 		"licenceCost": 55,
// 	},{
// 		"productId": 2,
// 		"publisherName": "Excel",
// 		"licenceCost": 86,
// 	},{
// 		"productId": 2,
// 		"publisherName": "PowerPoint",
// 		"licenceCost": 765,
// 	}];

export const SOFTWARES: Software[] = [
	new Software(1,"Word", 55),
	new Software(2,"Excel", 86),
	new Software(3,"PowerPoint", 765),
];