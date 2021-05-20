import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants';
import { ParentClass } from '../generic/parent.class';
import { AllServices } from '../generic/services/all-service.class';

declare const $: any
declare const M: any;
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
      Validators.required
    ])
  });

  api: string;
  apiSession: string;

  telaLogin: boolean;

  constructor(private allServices: AllServices, private route: Router) { super(); }

  ngOnInit(): void {
    $(document).ready(() => {
      var maskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
      },
        options = {
          onKeyPress: function (val, e, field, options) {
            field.mask(maskBehavior.apply({}, arguments), options);
          }
        };

      $('.phoneCel').mask(maskBehavior, options);
    })

    this.api = this.getUrlService("users");
    this.apiSession = this.getUrlService("session");

    this.telaLogin = true;
  }

  invalidPhoneNumber() { return this.formLogin.controls.phoneNumber.hasError('required') }

  async onLogin() {
    var blnCriarSession = true;

    if (!this.telaLogin) {

      if (this.formLogin.controls["name"].value == null || this.formLogin.controls["name"].value == "" ||
        this.formLogin.controls["phoneNumber"].value == null || this.formLogin.controls["phoneNumber"].value == "") {

        M.toast({ html: 'Insert value in all fields!' });
        return;
      }

      var dataCadastro = {};

      Object.keys(this.formLogin.controls).map(k => {
        dataCadastro[k] = this.formLogin.controls[k].value;

        if (k == "phoneNumber")
          dataCadastro[k] = this.removeMascara(dataCadastro[k]);
      })

      var responseLogin = await this.allServices.comnunication.post<any>(this.api, dataCadastro);

      if (!responseLogin.success) {
        var objMessage = responseLogin.data.message;
        var erroPhoneNumber = Object.keys(objMessage).filter(k => "phoneNumber");

        if (erroPhoneNumber.length > 0) {
          var objMessagePhoneNumber = objMessage[erroPhoneNumber[0]];
          var messagePhoneNumber = Array.isArray(objMessagePhoneNumber) ? objMessagePhoneNumber[0] : objMessagePhoneNumber;

          if (messagePhoneNumber != "has already been taken")
            blnCriarSession = false;
        }
      }
    } else {
      if (this.invalidPhoneNumber()) {
        M.toast({ html: 'Insert the Phone Number!' });
        return;
      }
    }

    if (!blnCriarSession) return;

    var responseSession = await this.allServices.comnunication.post<any>(this.apiSession, { phoneNumber: this.removeMascara(this.formLogin.controls["phoneNumber"].value) });

    if (!responseSession.success) {
      M.toast({ html: 'User not found' });
      this.telaLogin = !this.telaLogin;

      setTimeout(() => {
        $("#nameText").focus();
      }, (100));

      return;
    }

    localStorage.setItem(Constants.STORAGE_USER_SESSION, JSON.stringify({
      access_token: responseSession.data,
      name: this.formLogin.controls["name"].value,
      phoneNumber: this.formLogin.controls["phoneNumber"].value
    }));

    this.route.navigate(["/"]);
  }

  toggleTela() {
    this.telaLogin = !this.telaLogin;
  }

  private removeMascara(value: string): string {
    var er = /[^0-9]/gi;
    return value.replace(er, "");
  }
}
