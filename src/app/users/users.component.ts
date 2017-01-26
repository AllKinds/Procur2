import { Component, ViewChild, OnInit} from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { UnitService } from '../units/unit.service';
import { PurchaseService } from '../purchases/purchase.service';
import { MdSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

// import {
// 	MdlDialogService,
// 	MdlDialogReference
// } from 'angular2-mdl';

@Component ({
	selector: 'users-tab',
	templateUrl: 'users.component.html',
	// styleUrls: ['users.component.css']
})

export class UsersMgmnt {
	private users;
	private searchInput="";
	public erroMsg: string;
	userId: string = "";
	subUser: string = "";


	selectedValue: string;

	foods = [
	  {value: 'steak-0', viewValue: 'Steak'},
	  {value: 'pizza-1', viewValue: 'Pizza'},
	  {value: 'tacos-2', viewValue: 'Tacos'}
	];

	constructor(
		private userService: UserService,
		private unitService: UnitService,
		// private dialogService: MdlDialogService,
	) {}

	public ngOnInit() {
	  this.getUsers();
	}

	getUsers() {
		this.userService.getUsers()
						.subscribe(
							users 		=> this.users = users,
							error 		=> this.erroMsg = <any>error);
		console.log(this.users);
		console.log(this.erroMsg);
	}

	// validOnSearch(user: User): boolean {
	// 	return (!this.searchInput) ||
	// 	 user.userId.toString().includes(		this.searchInput.toLowerCase() ) ||
	// 	 user.subUser.toLowerCase().includes(	this.searchInput.toLowerCase() );
	// }

	// tempAddUser(){
	// 	let user = new User(
	// 		this.userId,
	// 		this.subUser
	// 	);
	// 	this.addUser(user);
	// }
	// addUser(user: User){
	// 	this.userService.addUser(user)
	// 		.subscribe(
	// 			user => {
	// 				console.log('Added: '+ user);
	// 			},
	// 			error    => console.log("Error: "+<any>error)
	// 		);
	// }

	// deleteUser(user: User) {
	// 	this.userService.deleteUser(user._id)
	// 							.subscribe(
	// 								user_id  => {console.log("Res is "+user_id); this.deletePurchasesByUser(user_id)},
	// 								error => console.log("Error: "+<any>error)
	// 								);
	// }

	// deletePurchasesByUser (user_id: string) {
	// 	this.purhcaseDataService.deletePurchasesByUser(user_id)
	// 		.subscribe(
	// 			res => console.log(res),
	// 			error => console.log("Error: "+<any>error)
	// 		);
	// }
}