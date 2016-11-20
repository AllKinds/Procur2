import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import 'rxjs/add/operator/filter';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';

const emailValidator = Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$');

@Component({
  selector: 'reactive-task',
  templateUrl: 'reactiveform.component.html'
})
export class ReactiveTaskForm implements OnInit {


  public form: FormGroup;
  public firstName = new FormControl('');
  public lastName = new FormControl('', Validators.required);
  public title = new FormControl('', Validators.required);
  public id = new FormControl('', Validators.required);
  public createdAt = new FormControl('', Validators.required);
  public email = new FormControl('', emailValidator);
  public email2 = new FormControl('', emailValidator);
  public breakfast = new FormControl('Continental');
  public toDrink = new FormControl('Tea')

  // constructor(router: Router, route: ActivatedRoute, titleService: Title, private fb: FormBuilder) {
  // }

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.form = this.fb.group({
      'firstName':  this.firstName,
      'lastName':   this.lastName,
      'email':      this.email,
      'email2':     this.email2,
      'breakfast':  this.breakfast,
      'toDrink':    this.toDrink
    });
  }

  public onSubmit() {
    console.log(this.form);
  }
}