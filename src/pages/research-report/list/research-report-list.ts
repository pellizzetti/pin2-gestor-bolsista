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
import { ResearchReportServiceProvider } from "../../../providers/research-report-service/research-report-service";

@IonicPage()
@Component({
  selector: "page-research-report-list",
  templateUrl: "research-report-list.html"
})
export class ResearchReportListPage implements OnInit {
  loadingData: Loading;
  listResearchReports: any = [];
  emptyList: boolean = false;
  user: any;

  constructor(
    private nav: NavController,
    private authService: AuthServiceProvider,
    private researchReportService: ResearchReportServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo();
    if (!userDecoded || userDecoded === null) {
      this.nav.setRoot('LoginPage');
    }

    await this.getResearchReportList(userDecoded.userId);
  }

  private async getResearchReportList(userId) {
    this.showLoading();

    this.researchReportService.getResearchReportList().subscribe(
        res => {
          if (res.success) {
            this.listResearchReports = res.researchReportList || [];

            if (this.listResearchReports.length === 0) {
              this.emptyList = true;
            }

            this.listResearchReports.filter(item => item.user_id === userId);

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

  private navigateToResearchReport() {
    this.nav.setRoot("ResearchReportPage");
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
