import {
  Component,
  OnInit,
  Input
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
const numValidator = Validators.pattern('[1-9]+[0-9]*');

@Component({
  selector: 'reactive-form-demo',
  templateUrl: 'reactiveform.component.html'
})
export class ReactiveFormsDemo implements OnInit {

  @Input() closeForm: Function;

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
  // Mine:
  public productId = new FormControl('', numValidator, Validators.required);
  public publisherName= new FormControl('', Validators.required);
  public licenceCost= new FormControl('', numValidator, Validators.required);

  // constructor(router: Router, route: ActivatedRoute, titleService: Title, private fb: FormBuilder) {
  // }

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.form = this.fb.group({
      'firstName':      this.firstName,
      'lastName':       this.lastName,
      'email':          this.email,
      'email2':         this.email2,
      'breakfast':      this.breakfast,
      'toDrink':        this.toDrink,
      // Mine:
      'productId':      this.productId,
      'publisherName':  this.publisherName,
      'licenceCost':    this.licenceCost 
    });
  }

  public onSubmit() {
    console.log(this.form.value);
  }

  saveUser() {
    
  }

  cancel () {

  }
}





      // <!--        Mine        -->
      // <mdl-textfield
      //         label="Product ID"
      //         name="productId"
      //         type="number"
      //         formControlName="productId"
      //         floating-label
      //         pattern="[1-9]+[0-9]*"></mdl-textfield>
      // <mdl-textfield
      //         label="Publisher Name"
      //         name="publisherName"
      //         type="text"
      //         formControlName="publisherName"
      //         floating-label></mdl-textfield>
      // <mdl-textfield
      //         label="Licence Cost"
      //         name="licenceCost"
      //         type="number"
      //         formControlName="licenceCost"
      //         floating-label></mdl-textfield>