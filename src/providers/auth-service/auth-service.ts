import { Injectable } from "@angular/core";
//import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
import "rxjs/add/operator/map";

import { API_URL } from '../../app/constants';

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Preencha os campos para continuar");
    } else {
      return Observable.create(observer => {
              this.storage.set('jwt', res.jwt)
                .then(() => {
                  observer.next(res);
                  observer.complete();
                });
        );
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Preencha os campos para continuar");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

    return this.storage.get('jwt')
  }

  public logout() {
    return Observable.create(observer => {
      this.storage.remove('jwt');
      observer.next(true);
      observer.complete();
    });
  }
}
