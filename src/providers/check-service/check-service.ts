import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

import { API_URL } from '../../app/constants';

@Injectable()
export class CheckServiceProvider {
  constructor(private http: HttpClient) {}

  public checkUser(userId) {
    return Observable.create(observer => {
      this.http
        .post(`${API_URL}/checkinout/${userId}`, {})
        .subscribe(
          res => {
            observer.next(res);
            observer.complete();
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

  public getCheckInOutUser(userId) {
    return Observable.create(observer => {
      this.http
        .get(`${API_URL}/checkinout/list/${userId}`, {})
        .subscribe(
          res => {
            observer.next(res);
            observer.complete();
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
