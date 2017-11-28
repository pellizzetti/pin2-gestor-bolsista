import { Component, OnInit } from "@angular/core";
import {
  NavController,
  IonicPage,
  AlertController,
  LoadingController,
  Loading
} from "ionic-angular";
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { UserServiceProvider, UserResponse, UserListResponse } from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: "page-user",
  templateUrl: "user.html"
})
export class UserPage implements OnInit {
  userForm: FormGroup;
  loading: Loading;
  userLevel: string;

  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthServiceProvider,
    private userService: UserServiceProvider,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      level: ['bolsista', Validators.required],
      area: ['extensao', Validators.required],
    });
  }

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo();
    if (!userDecoded || userDecoded === null) {
      this.nav.setRoot('LoginPage');
    }

    if (userDecoded.userLevel === 'bolsista') {
      this.nav.setRoot('HomePage');
    }

    this.userLevel = userDecoded.userLevel;
  }

  private saveUser() {
    this.showLoading();

    this.userService.save(this.userForm.value).subscribe(
      (res: UserResponse) => {
        if (res.success) {
          this.nav.setRoot('UserListPage');
        } else if (res.message) {
          this.showError(res.message);
        } else {
          this.showError('Não foi possível conectar com o servidor da API!');
        }
      },
      err => {
        if (err.error) {
          this.showError(err.error.message);
        } else {
          this.showError(err.message);
        }
      }
    );
  }

  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde...",
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  private showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle: text,
      buttons: ["OK"]
    });

    alert.present(prompt);
  }

  private logout() {
    this.authService.logout().subscribe(succ => {
      this.nav.setRoot("LoginPage");
    });
  }
}
