import { Purchase } from '../models/purchase';

var forYear_1 = {year:2010,amount:20};
var forYear_2 = {year:2012,amount:15};
var forYear_3 = {year:2013,amount:4};

export const PURCHASES: Purchase[] = [
	new Purchase(1,1000, "1111", [forYear_1]),
	new Purchase(2,2000, "2222", [forYear_2, forYear_3]),
	new Purchase(3,3000, "3333", []),
];