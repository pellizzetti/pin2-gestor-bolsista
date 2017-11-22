import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-user",
  templateUrl: "user.html"
})
export class UserPage {
  username: string = '';
  email: string = '';

  constructor(private nav: NavController, private auth: AuthServiceProvider) {
    this.auth.getUserInfo()
      .then((userDecoded) => {
        const userInfo = userDecoded;

        this.username = userInfo.userName;
        this.email = userInfo.userLevel;
      });
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot("LoginPage");
    });
  }
}
