import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import "rxjs/add/operator/map";

import { API_URL } from '../../app/constants';

export interface Response {
  auth: boolean;
  message: string;
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
    if (token === null || token === '') {
      return { 'upn': '' };
    }

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

  public login({ email, password }) {
    if (email === null || password === null) {
      return Observable.throw('Preencha os campos para continuar');
    } else {
      const body = {
        email,
        password
      };
      
      return this.http.post<Response>(`${API_URL}/user/login`, body)
        .map((res) => {
          if (res && res.jwt) {
            this.storage.set('jwt', res.jwt);
          }

          if (res.message) {
            return res;
          }
            
          return res;
        });
    }
  }

  public async getUserInfo() {
    try {
      const token = await this.storage.get('jwt');
      const decoded = this.decodeToken(token);

      return decoded.context ? decoded.context.user : null;
    } catch (err) {
      throw err;
    }
  }

  public logout() {
    return Observable.create(observer => {
      this.storage.remove('jwt');
      observer.next(true);
      observer.complete();
    });
  }
}
