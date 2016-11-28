import { PURCHASES }  from './purchase_mocks';
import { Injectable } from '@angular/core';

@Injectable()
export class PurchaseDataService {
	getPurchases() {
		return PURCHASES;
	}
}