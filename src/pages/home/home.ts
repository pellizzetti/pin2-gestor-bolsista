import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common"
import {
  NavController,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavParams
} from "ionic-angular";
import { Observable } from 'rxjs';

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { CheckServiceProvider } from "../../providers/check-service/check-service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  checkin: boolean = true;
  loading: boolean = false;
  loadingData: Loading;
  sucess: boolean = false;
  user: any = { userLevel: null };
  listCheckInOut: any = [];
  emptyList: boolean = false;

  constructor(
    private nav: NavController,
    private authService: AuthServiceProvider,
    private alertCtrl: AlertController,
    private check: CheckServiceProvider,
    private loadingCtrl: LoadingController,
    private navParams: NavParams
  ) {}

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo();
    if (!userDecoded || userDecoded === null) {
      this.nav.setRoot('LoginPage');
    }
    
    this.user = userDecoded;
    await this.getUserCheckInOutList();
  }

  public userCheckInOut() {
    this.loading = true;

    this.check.checkUser(this.user.userId).subscribe(
      res => {
        if (!res.checked) {
          const parser = new DOMParser();
          const htmlError = parser.parseFromString(res, 'text/html');
          const preError = htmlError.getElementsByTagName('pre')[0] ? htmlError.getElementsByTagName('pre')[0].innerHTML : '';

          this.loading = false;

          if (preError.includes('ECONNREFUSED')) {
            this.showError('Não foi possível conectar com o servidor da API!');
          } else {
            this.showError(res.msg);
          }
        } else {
          this.sucess = true;
          this.checkin = !this.checkin
          this.loading = false;
          this.emptyList = false;
          this.listCheckInOut.push(res.checkInOut)
        }
      },
      err => {
        if (err.error && err.error.message) {
          this.showError(err.error.message);
        } else {
          this.showError(err.message);
        }
      }
    );
  }

  private async getUserCheckInOutList() {
    this.showLoading();
    
    this.check.getCheckInOutUser(this.user.userId).subscribe(
        res => {
          if (!res.success) {
            const parser = new DOMParser();
            const htmlError = parser.parseFromString(res, 'text/html');
            const preError = htmlError.getElementsByTagName('pre')[0] ? htmlError.getElementsByTagName('pre')[0].innerHTML : '';

            this.listCheckInOut = [];
            if (preError.includes('ECONNREFUSED')) {
              this.showError('Não foi possível conectar com o servidor da API!');
            } else {
              this.showError(res.msg);
            }
          } else {
            if (res.checkInOutList && res.checkInOutList.length > 0) {
              this.checkin = res.checkInOutList[res.checkInOutList.length - 1].in_out === 'in' ? false : true;
            } else {
              this.checkin = true;
            }

            this.listCheckInOut = res.checkInOutList || [];
            if (this.listCheckInOut.length === 0) {
              this.emptyList = true;
            }
            this.loadingData.dismiss();
          }
        },
        err => {
          this.showError(err);
        }
    );
  }

  private navigateToAttendance() {
    this.nav.setRoot("AttendancePage");
  }

  public logout() {
    this.authService.logout().subscribe(succ => {
      this.nav.setRoot("LoginPage");
    });
  }

  private showLoading() {
    this.loadingData = this.loadingCtrl.create({
      content: 'Buscando dados da API...',
      dismissOnPageChange: true
    });

    this.loadingData.present();
  }

  private showError(text) {
    this.loading = false;
    this.loadingData.dismiss;

    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle: text,
      buttons: ["OK"]
    });

    alert.present(prompt);
  }
}
