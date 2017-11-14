import { Injectable } from "@angular/core";
//import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import "rxjs/add/operator/map";

import { API_URL } from '../../app/constants';

interface Response {
  auth: boolean;
  msg: string;
  jwt: string;
  }

@Injectable()
export class AuthServiceProvider {
  constructor(private http: HttpClient, private storage: Storage) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Preencha os campos para continuar');
    } else {
      return Observable.create(observer => {

        const body = {
          email: credentials.email,
          password: credentials.password
        };

        this.http
          .post<Response>(`${API_URL}/login`, body)
          .subscribe(
            res => {
              this.storage.set('jwt', res.jwt)
                .then(() => {
                  observer.next(res);
                  observer.complete();
                });
            },
            err => {
              if (err.error) {
                observer.next(err.error);
                observer.complete();
              } else {
                console.log('Ocorreu um erro', err);
              }
            }
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
