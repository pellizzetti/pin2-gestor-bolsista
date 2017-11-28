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
import { ResearchReportServiceProvider, ResearchReportResponse } from "../../providers/research-report-service/research-report-service";

@IonicPage()
@Component({
  selector: "page-research-report",
  templateUrl: "research-report.html"
})
export class ResearchReportPage implements OnInit {
  researchReportForm: FormGroup;
  loading: Loading;
  userId: number;

  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthServiceProvider,
    private researchReportService: ResearchReportServiceProvider,
    private formBuilder: FormBuilder
  ) {
    this.researchReportForm = this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo();
    if (!userDecoded || userDecoded === null) {
      this.nav.setRoot('LoginPage');
    }

    this.userId = userDecoded.userId;
  }

  private saveAttendance() {
    this.showLoading();

    this.researchReportService.save(this.researchReportForm.value, this.userId).subscribe(
      (res: ResearchReportResponse) => {
        if (res.success) {
          this.nav.setRoot('ResearchReportListPage');
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
