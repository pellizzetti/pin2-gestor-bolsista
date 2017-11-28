import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-report",
  templateUrl: "report.html"
})
export class ReportPage {
  reports: Array<{title: string, component: any}>

  constructor(
    private nav: NavController,
    private authService: AuthServiceProvider
   ) {
    this.reports = [
      { title: 'Usuários', component: 'HomePage' },
      { title: 'Relatórios de controle', component: 'AttendanceListPage' },
      { title: 'Folha ponto', component: 'UserListPage' },
      { title: 'Relatório semestral', component: 'ReportPage' }
    ];
   }      

  async ngOnInit() {
    const userDecoded = await this.authService.getUserInfo();
    if (!userDecoded || userDecoded === null) {
      this.nav.setRoot('LoginPage');
    }

    if (userDecoded.userLevel === 'bolsista') {
      this.nav.setRoot('HomePage');
    }
  }

  public logout() {
    this.authService.logout().subscribe(succ => {
      this.nav.setRoot("LoginPage");
    });
  }
}
