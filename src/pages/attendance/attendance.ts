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
import { AttendanceServiceProvider, AttendanceResponse } from "../../providers/attendance-service/attendance-service";

@IonicPage()
@Component({
  selector: "page-attendance",
  templateUrl: "attendance.html"
})
export class AttendancePage implements OnInit {
  attendanceForm: FormGroup;
  loading: Loading;
  userId: number;

  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthServiceProvider,
    private attendanceService: AttendanceServiceProvider,
    private formBuilder: FormBuilder
  ) {
    this.attendanceForm = this.formBuilder.group({
      student: ['', Validators.required],
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

    this.attendanceService.save(this.attendanceForm.value, this.userId).subscribe(
      (res: AttendanceResponse) => {
        if (res.success) {
          this.nav.setRoot('AttendanceListPage');
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
