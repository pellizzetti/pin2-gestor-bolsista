import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  IonicPage
} from "ionic-angular";

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { CheckServiceProvider } from "../../providers/check-service/check-service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  checkin: boolean = true;
  loading: boolean = false;
  sucess: boolean = false;
  user: any;

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private check: CheckServiceProvider
  ) {
    this.auth.getUserInfo()
      .then((userDecoded) => {
        this.user = userDecoded;

        this.check.getCheckInOutUser(this.user.userId).subscribe(
          res => {
            if (!res.success) {
              const parser = new DOMParser();
              const htmlError = parser.parseFromString(res, 'text/html');
              const preError = htmlError.getElementsByTagName('pre')[0] ? htmlError.getElementsByTagName('pre')[0].innerHTML : '';

              if (preError.includes('ECONNREFUSED')) {
                this.showError('Não foi possível conectar com o servidor da API!');
              } else {
                this.showError(res.msg);
              }
            } else {
              this.checkin = res.checkInOutList[res.checkInOutList.length - 1].in_out === 'in' ? false : true;

              this.listCheckInOut = res.checkInOutList;
            }
          },
          err => {
            this.showError(err);
          }
        );
      });
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot("LoginPage");
    });
  }

  public userCheckInOut() {
    this.loading = true;

    this.check.checkUser(this.user.userId).subscribe(
      res => {
        if (!res.checked) {
          const parser = new DOMParser();
          const htmlError = parser.parseFromString(res, 'text/html');
          const preError = htmlError.getElementsByTagName('pre')[0] ? htmlError.getElementsByTagName('pre')[0].innerHTML : '';

          if (preError.includes('ECONNREFUSED')) {
            this.showError('Não foi possível conectar com o servidor da API!');
          } else {
            this.showError(res.msg);
          }
        }
      },
      err => {
        this.showError(err);
      }
    );

    setTimeout(() => {
      this.loading = false;
      this.sucess = true;
    }, 4000);

    setTimeout(() => {
      this.checkin = false;
    }, 1000);
  }

  private showError(text) {
    this.loading = false;

    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle: text,
      buttons: ["OK"]
    });

    alert.present(prompt);
  }

  private getUserCheckInOutList() {

  }
}
