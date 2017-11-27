import { Component, OnInit } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController,
  Loading,
  IonicPage
} from "ionic-angular";

import { AuthServiceProvider, Response } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage implements OnInit {
  loading: Loading;
  registerCredentials = {
    email: '',
    password: ''
  };

  constructor(
    private nav: NavController,
    private authService: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo();
    if (userDecoded) {
      this.nav.setRoot('HomePage');
    }
  }

  private login() {
    this.showLoading();

    this.authService.login(this.registerCredentials).subscribe(
      (res: Response) => {
        if (res.auth) {
          this.nav.setRoot('HomePage');
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
}
