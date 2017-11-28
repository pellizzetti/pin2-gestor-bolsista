import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  IonicPage,
  Loading,
  LoadingController
} from "ionic-angular";
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import { AuthServiceProvider } from "../../../providers/auth-service/auth-service";
import { UserServiceProvider } from "../../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: "page-report",
  templateUrl: "report-user.html"
})
export class ReportUserPage {
  loadingData: Loading;
  listUsers: any = [];
  columns: any;
  emptyList: boolean = false;

  constructor(
    private nav: NavController,
    private authService: AuthServiceProvider,
    private userService: UserServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
   ) {}

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo();
    if (!userDecoded || userDecoded === null) {
      this.nav.setRoot('LoginPage');
    }

    if (userDecoded.userLevel === 'bolsista') {
      this.nav.setRoot('HomePage');
    }

    this.columns = [
      { title: "ID", dataKey: "id" },
      { title: "Nome", dataKey: "name" },
      { title: "E-mail", dataKey: "email" },
      { title: "Nível", dataKey: "level" },
      { title: "Área", dataKey: "area" }
    ];

    await this.getUserList();
  }

  private async getUserList() {
    this.showLoading();

    this.userService.getUserList().subscribe(
        res => {
          if (res.success) {
            console.log(res)
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

  private downloadPdf() {
    const report = new jsPDF('p', 'pt');
    report.autoTable(this.columns, this.listUsers);
    report.save('Usuarios.pdf');
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
