import { Injectable } from "@angular/core";
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

  private urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'String base64url inválida!';
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  private decodeToken(token: string = '') {
    if (token === null || token === '') { return { 'upn': '' }; }
    const parts = token.split('.');
    if (parts.length !== 3) {

        throw new Error('JWT deve ter 3 partes');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
        throw new Error('Não foi possível analisar o JWT');
    }
    return JSON.parse(decoded);
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Preencha os campos para continuar');
    } else {
      return Observable.create(observer => {

        const body = {
          email: credentials.email,
          password: credentials.password
        };

        let access = false

        this.http
          .post<Response>(`${API_URL}/login`, body)
          .subscribe(
            res => {
              console.log(res)
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
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Preencha os campos para continuar');
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() {
    return this.storage.get('jwt')
      .then((token) => {
        const decoded = this.decodeToken(token);

        return decoded.context.user;
      });
  }

  public logout() {
    return Observable.create(observer => {
      this.storage.remove('jwt');
      observer.next(true);
      observer.complete();
    });
  }
}
