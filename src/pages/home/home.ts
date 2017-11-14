import { Component } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  username: string = "";
  email: string = "";

  constructor(private nav: NavController, private auth: AuthServiceProvider) {
    this.auth.getUserInfo()
      .then((userInfo) => {
        const info = userInfo
        console.log('info', info)
      });

    // this.username = info["name"];
    // this.email = info["email"];
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot("LoginPage");
    });
  }
}
