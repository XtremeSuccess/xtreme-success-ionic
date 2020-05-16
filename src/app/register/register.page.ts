import { NavController } from '@ionic/angular';
import { UserDetail } from './../models/user/user';
import { UserService } from './../services/user/user.service';
import { Storage } from '@ionic/storage';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { v1 as uuidv1 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly storage: Storage,
    private readonly userService: UserService,
    private readonly navController: NavController
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: [null, [Validators.required, Validators.minLength(3)]],
      lastname: [null, [Validators.required, Validators.minLength(3)]],
      mobile_number: [null, [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}/)]],
      parent_name: [null, [Validators.required, Validators.minLength(6)]],
      school_name: [null, [Validators.required, Validators.minLength(6)]],
      address: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  submitRegisterForm() {
    const formData = {
      firstname: this.registerForm.controls['firstname'].value,
      lastname: this.registerForm.controls['lastname'].value,
      mobile_number: this.registerForm.controls['mobile_number'].value,
      parent_name: this.registerForm.controls['parent_name'].value,
      school_name: this.registerForm.controls['school_name'].value,
      address: this.registerForm.controls['address'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      username: uuidv1()
    };
    this.authService.register(formData.username, formData.email, formData.password).subscribe(
      (data: any) => {
        this.storage.set('access_token', data.jwt).then(
          (x: any) => {
            this.userService.setUserDetails(formData).subscribe(
              (data: any) => {
                this.storage.clear().then((v: any) => {
                  this.navController.navigateForward(['/home']);
                });
              }, (error) => console.log(error)
            )
          }
        );
      }
    );
  }

}
