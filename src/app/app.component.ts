import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  pages: Array<{title: string, component: any}>

  constructor(
    public platform: Platform,
    public menuCtrl: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthServiceProvider
  ) {
    this.pages = [
      { title: 'Início', component: 'HomePage' },
      { title: 'Atendimentos', component: 'AttendanceListPage' },
      { title: 'Usuários', component: 'UserListPage' },
      { title: 'Relatórios', component: 'ReportPage' }
    ];

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public openPage(page) {
    this.menuCtrl.close();
    this.nav.setRoot(page.component);
  }

  public logout() {
    this.authService.logout().subscribe(succ => {
      this.nav.setRoot("LoginPage");
    });
  }
}

