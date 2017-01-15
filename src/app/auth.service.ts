import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { User } from './users/user';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  public user: User;
  private userUrl = 'http://localhost:3000/api/user';

  constructor(private http: Http) {}

  isAdmin(): boolean {
  	
  	if(!this.user || this.user.permission != "Admin"){
  		return false;
  	}
  	return true;
  }

  canView(): boolean {
    if(!this.user || this.user.permission == 'Basic') {
      return false;
    }
    return true;
  }

  login(): Observable<User> {
  	// this.user = new User("123", "Avi Ron", "Admin");
    return this.getUser();
    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
  	this.user = undefined;
    this.isLoggedIn = false;
  }

  getUser(): Observable<User> { // 
    return this.http.get(this.userUrl+'/Admin')
            .map((res: Response) => {
              let user = this.extractData(res);
              this.user = user;
              this.isLoggedIn = true;
            })
            .catch(this.handleError);
  }

  getMyUser(): User {
    return this.user;
  }

  private extractData(res: Response) {
    let user = res.json();
    return user;
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
