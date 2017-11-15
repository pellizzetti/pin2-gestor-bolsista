import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  checkin: boolean = true;
  loading: boolean = false;
  sucess: boolean = null;

  constructor(private nav: NavController, private auth: AuthServiceProvider) {
    this.auth.getUserInfo()
      .then((userInfo) => {
        const info = userInfo
        console.log('info', info)
      });
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot("LoginPage");
    });
  }

  public userCheckInOut() {
    this.loading = true

    setTimeout( () => {
      this.sucess = true
      this.loading = false
      this.checkin = false
    }, 4000);
  }
}
