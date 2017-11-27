import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common"
import {
  NavController,
  AlertController,
  IonicPage,
  Loading,
  LoadingController
} from "ionic-angular";

import { AuthServiceProvider } from "../../../providers/auth-service/auth-service";
import { UserServiceProvider } from "../../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: "page-attendance-list",
  templateUrl: "attendance-list.html"
})
export class AttendanceListPage implements OnInit {
  loadingData: Loading;
  listUsers: any = [];
  emptyList: boolean = false;

  constructor(
    private nav: NavController,
    private authService: AuthServiceProvider,
    private userService: UserServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo()
    if (!userDecoded || userDecoded === null) {
      this.nav.setRoot('LoginPage');
    } else if (userDecoded.userLevel === 'bolsista') {
      this.nav.setRoot('HomePage');
    }
    
    await this.getUserList();
  }

  private async getUserList() {
    this.showLoading();

    this.userService.getUserList().subscribe(
        res => {
          if (res.success) {
            this.listUsers = res.usersList || [];

            if (this.listUsers.length === 0) {
              this.emptyList = true;
            }

            this.loadingData.dismiss();
          } else if (res.message) {
            this.showError(res.message);
          } else {
            this.showError('Não foi possível conectar com o servidor da API!');
          }
        },
        err => {
          this.showError(err);
        }
    );
  }

  private navigateToUser() {
    this.nav.setRoot("UserPage");
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
    this.loadingData.dismiss;

    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle: text,
      buttons: ["OK"]
    });

    alert.present(prompt);
  }
}
