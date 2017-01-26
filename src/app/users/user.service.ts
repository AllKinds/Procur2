import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User, deleteUserFromArray } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
	private usersUrl = 'http://localhost:3000/api/users';
	private userUrl = 'http://localhost:3000/api/user';

	public users: User[];

	constructor(private http: Http) {
		this.users = [];
	}

	getUsers(): Observable<User[]> {
		return this.http.get(this.usersUrl)
						.map((res: Response) => {
							let users = this.extractData(res);
							this.users = users;
						})
						.catch(this.handleError);
	}

	addUser(user: User): Observable<User> {
		return this.http.post(this.userUrl, user)
						.map((res: Response) => {
							let user = this.extractData(res);
							this.users.push(user);
						})
						.catch(this.handleError);
	}

	deleteUser(id: string) {
		if(!id) {
			return; //ERR
		}
		return this.http.delete(`${this.userUrl}/${id}`)
						.map((res: Response) => {
							let user_id = this.extractData(res);
							deleteUserFromArray(this.users, user_id);
							return user_id;
						})
						.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body;
	}

	private handleError (error: Response | any) {
	// In a real world app, we might use a remote logging infrastructure
	let errMsg: string;
	if (error instanceof Response) {
	  const body = error.json() || '';
	  const err = body.error || JSON.stringify(body);
	  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	} else {
	  errMsg = error.message ? error.message : error.toString();
	}
	console.error(errMsg);
	return Observable.throw(errMsg);
	}
}