import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController,
  Loading,
  IonicPage
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: "", password: "" };

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  public createAccount() {
    this.nav.push("RegisterPage");
  }

  public login() {
    this.showLoading();

    this.auth.login(this.registerCredentials).subscribe(
      res => {
        if (res.auth) {
          this.nav.setRoot("HomePage");
        } else if (res.msg) {
          this.showError(res.msg);
        } else {
          const parser = new DOMParser();
          const htmlError = parser.parseFromString(res, 'text/html');
          const preError = htmlError.getElementsByTagName('pre')[0] ? htmlError.getElementsByTagName('pre')[0].innerHTML : '';

          if (preError.includes('ECONNREFUSED')) {
            this.showError('Não foi possível conectar com o servidor da API!');
          }
        }
      },
      err => {
        this.showError(err);
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde...",
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle: text,
      buttons: ["OK"]
    });

    alert.present(prompt);
  }
}
