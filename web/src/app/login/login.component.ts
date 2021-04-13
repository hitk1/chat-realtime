import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../constants/constants';
import { ParentClass } from '../generic/parent.class';
import { AllServices } from '../generic/services/all-service.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends ParentClass<any> implements OnInit {

  formLogin: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(11)
    ])
  });

  api: string;
  apiSession: string;

  constructor(private allServices: AllServices, private route: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.api = this.getUrlService("users");
    this.apiSession = this.getUrlService("session");

  }

  validPhoneNumber() {
    return this.formLogin.controls.phoneNumber.hasError('maxLength') ||
      this.formLogin.controls.phoneNumber.hasError('minLength')
  }

  async onLogin() {
    var responseLogin = await this.allServices.comnunication.post<any>(this.api, this.formLogin.value);
    if (responseLogin.success) {

      var responseSession = await this.allServices.comnunication.post<any>(this.apiSession, { phoneNumber: this.formLogin.controls["phoneNumber"].value });

      if (responseSession.success)
        localStorage.setItem(Constants.STORAGE_USER_SESSION, JSON.stringify({
          access_token: responseSession.data,
          name: this.formLogin.controls["name"].value,
          phoneNumber: this.formLogin.controls["phoneNumber"].value
        }))
    }
    console.log(responseSession);
  }
}
