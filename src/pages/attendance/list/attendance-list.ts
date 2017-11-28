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
import { AttendanceServiceProvider } from "../../../providers/attendance-service/attendance-service";

@IonicPage()
@Component({
  selector: "page-attendance-list",
  templateUrl: "attendance-list.html"
})
export class AttendanceListPage implements OnInit {
  loadingData: Loading;
  listAttendances: any = [];
  emptyList: boolean = false;
  user: any;

  constructor(
    private nav: NavController,
    private authService: AuthServiceProvider,
    private attendanceService: AttendanceServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo();
    if (!userDecoded || userDecoded === null) {
      this.nav.setRoot('LoginPage');
    } 
        
    await this.getAttendanceList(userDecoded.userId);
  }

  private async getAttendanceList(userId) {
    this.showLoading();

    this.attendanceService.getAttendanceList().subscribe(
        res => {
          if (res.success) {
            this.listAttendances = res.attendanceList || [];

            if (this.listAttendances.length === 0) {
              this.emptyList = true;
            }

            this.listAttendances.filter(item => item.user_id === userId);

            this.loadingData.dismiss();
          } else if (res.message) {
            this.showError(res.message);
          } else {
            this.showError('Não foi possível conectar com o servidor da API!');
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
    this.loadingData.dismiss;

    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle: text,
      buttons: ["OK"]
    });

    alert.present(prompt);
  }
}
